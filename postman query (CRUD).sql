ALTER TABLE UsersTable

ALTER COLUMN UserID INT IDENTITY(1,1) NOT NULL;
ALTER TABLE UsersTable DROP COLUMN UserID;
use APIDb

-- Step 1: Drop the primary key constraint
ALTER TABLE UsersTable DROP CONSTRAINT UsersTable_pkey;

-- Step 2: Drop the UserID column
ALTER TABLE UsersTable DROP COLUMN UserID;

-- Step 3: Add UserID back with IDENTITY
ALTER TABLE UsersTable ADD UserID INT IDENTITY(1,1) NOT NULL;

-- Step 4: Re-add the primary key constraint
ALTER TABLE UsersTable ADD CONSTRAINT UsersTable_pkey PRIMARY KEY (UserID);

select * from UsersTable;
