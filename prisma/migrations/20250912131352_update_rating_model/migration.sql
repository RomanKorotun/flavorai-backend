/*
  Warnings:

  - A unique constraint covering the columns `[userId,recipeId]` on the table `ratings` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ratings_userId_recipeId_key" ON "public"."ratings"("userId", "recipeId");
