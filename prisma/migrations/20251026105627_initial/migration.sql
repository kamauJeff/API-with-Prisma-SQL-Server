/*
  Warnings:

  - A unique constraint covering the columns `[EmailAddress]` on the table `UsersTable` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- CreateIndex
ALTER TABLE [dbo].[UsersTable] ADD CONSTRAINT [UsersTable_EmailAddress_key] UNIQUE NONCLUSTERED ([EmailAddress]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
