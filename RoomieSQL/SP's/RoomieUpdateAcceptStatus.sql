CREATE OR REPLACE FUNCTION public.roomieupdateacceptstatus(
	id uuid)
    RETURNS void
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
DECLARE
    AuthorIdentifier UUID;
    SubjectIdentifier UUID;
    AdID Integer;
    var_Date date;
    RentalUUID UUID;
    
BEGIN
    -- Retrieve the row from RentalHistoryTable
    SELECT "AuthorIdentifier", "SubjectIdentifier", "AdID", "Date"
    INTO AuthorIdentifier, SubjectIdentifier, AdID, var_Date
    FROM public."RentalHistoryTable"
    WHERE "RentalHistoryUID" = id;
    
    UPDATE public."RentalHistoryTable"
    SET "Status" = 1
    WHERE "RentalHistoryUID" = id;
    
    RentalUUID := uuid_generate_v4();
    
    INSERT INTO 
		public."RentalHistoryTable" ("AuthorIdentifier", "SubjectIdentifier", "Status", "AdID", "Date", "RentalHistoryUID")
    VALUES 
		(SubjectIdentifier, AuthorIdentifier, 1, AdID, var_Date, RentalUUID);
    
END;
$BODY$;

ALTER FUNCTION public.roomieupdateacceptstatus(uuid)
    OWNER TO postgres;
