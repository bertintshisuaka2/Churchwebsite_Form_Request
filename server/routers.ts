import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { createChurchSubmission, getAllChurchSubmissions, getChurchSubmissionById, updateChurchSubmissionStatus, getTrashedChurchSubmissions, softDeleteChurchSubmission, restoreChurchSubmission, permanentlyDeleteChurchSubmission } from "./db";
import { notifyOwner } from "./_core/notification";

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  submissions: router({
    create: publicProcedure
      .input(z.object({
        // Church Basic Information
        churchName: z.string().min(1),
        denomination: z.string().optional(),
        address: z.string().min(1),
        city: z.string().min(1),
        state: z.string().optional(),
        zipCode: z.string().optional(),
        country: z.string().min(1),
        phone: z.string().min(1),
        email: z.string().min(1).includes('@'),
        website: z.string().optional(),
        
        // Contact Person
        contactName: z.string().min(1),
        contactTitle: z.string().optional(),
        contactPhone: z.string().min(1),
        contactEmail: z.string().min(1).includes('@'),
        
        // Church Details
        missionStatement: z.string().optional(),
        visionStatement: z.string().optional(),
        statementOfFaith: z.string().optional(),
        churchHistory: z.string().optional(),
        
        // Service Information
        serviceTimes: z.string().optional(),
        
        // Ministries
        ministries: z.array(z.string()).optional(),
        
        // Website Requirements
        hasExistingWebsite: z.boolean().optional(),
        existingWebsiteUrl: z.string().optional(),
        desiredFeatures: z.array(z.string()).optional(),
        preferredColors: z.string().optional(),
        additionalNotes: z.string().optional(),
        
        // Budget and Timeline
        budget: z.string().optional(),
        timeline: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const submission = await createChurchSubmission({
          ...input,
          ministries: input.ministries ? JSON.stringify(input.ministries) : null,
          desiredFeatures: input.desiredFeatures ? JSON.stringify(input.desiredFeatures) : null,
          hasExistingWebsite: input.hasExistingWebsite ?? false,
        });

        // Notify owner of new submission
        await notifyOwner({
          title: "New Church Website Request",
          content: `New submission from ${input.churchName} (${input.contactName}). Email: ${input.contactEmail}`,
        });

        return submission;
      }),

    list: protectedProcedure.query(async ({ ctx }) => {
      // Only admin can view all submissions
      if (ctx.user.role !== 'admin') {
        throw new Error('Unauthorized');
      }
      
      const submissions = await getAllChurchSubmissions();
      
      // Parse JSON fields
      return submissions.map(s => ({
        ...s,
        ministries: s.ministries ? JSON.parse(s.ministries) : [],
        desiredFeatures: s.desiredFeatures ? JSON.parse(s.desiredFeatures) : [],
      }));
    }),

    getById: protectedProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input, ctx }) => {
        if (ctx.user.role !== 'admin') {
          throw new Error('Unauthorized');
        }

        const submission = await getChurchSubmissionById(input.id);
        if (!submission) {
          throw new Error('Submission not found');
        }

        return {
          ...submission,
          ministries: submission.ministries ? JSON.parse(submission.ministries) : [],
          desiredFeatures: submission.desiredFeatures ? JSON.parse(submission.desiredFeatures) : [],
        };
      }),

    updateStatus: protectedProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(['pending', 'in_progress', 'completed', 'cancelled']),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== 'admin') {
          throw new Error('Unauthorized');
        }

        await updateChurchSubmissionStatus(input.id, input.status);
        return { success: true };
      }),

    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== 'admin') {
          throw new Error('Unauthorized');
        }

        await softDeleteChurchSubmission(input.id);
        return { success: true };
      }),

    listTrashed: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== 'admin') {
        throw new Error('Unauthorized');
      }
      
      const submissions = await getTrashedChurchSubmissions();
      
      return submissions.map(s => ({
        ...s,
        ministries: s.ministries ? JSON.parse(s.ministries) : [],
        desiredFeatures: s.desiredFeatures ? JSON.parse(s.desiredFeatures) : [],
      }));
    }),

    restore: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== 'admin') {
          throw new Error('Unauthorized');
        }

        await restoreChurchSubmission(input.id);
        return { success: true };
      }),

    permanentlyDelete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== 'admin') {
          throw new Error('Unauthorized');
        }

        await permanentlyDeleteChurchSubmission(input.id);
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;

