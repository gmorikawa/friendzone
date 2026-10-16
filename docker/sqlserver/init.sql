IF DB_ID(N'friendzone') IS NULL
    CREATE DATABASE [friendzone];
GO

-- This local development password requires password policy to be disabled.
IF SUSER_ID(N'friendzone') IS NULL
    CREATE LOGIN [friendzone] WITH PASSWORD = 'friendzone123', CHECK_POLICY = OFF;
GO

USE [friendzone];
GO
IF USER_ID(N'friendzone') IS NULL
    CREATE USER [friendzone] FOR LOGIN [friendzone];
GO
ALTER ROLE [db_owner] ADD MEMBER [friendzone];
GO
