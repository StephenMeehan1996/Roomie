CREATE OR REPLACE FUNCTION public.roomiegetrentalhistory(
	id uuid)
    RETURNS TABLE(authoridentifier uuid, authorfirstname character varying, authorsecondname character varying, authorprofile character varying, status integer, adid integer, requestdate date, rentalhistoryid integer, rentalhistoryuid uuid) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
BEGIN
    RETURN QUERY 
    SELECT 
		U."UserIdentifier" AS AuthorIdentifier,
        U."FirstName" AS AuthorFirstName,
        U."SecondName" AS AuthorSecondName,
        P."ImageUrl" AS AuthorProfile,
		RH."Status",
		RH."AdID",
		RH."Date",
		RH."RentalHistoryID",
		RH."RentalHistoryUID"
    FROM 
        public."RentalHistoryTable" AS RH
    INNER JOIN 
        public."UserTBL" AS U ON RH."AuthorIdentifier" = U."UserIdentifier"
    INNER JOIN
        Public."ProfileImageTBL" AS P ON P."UserID" = U."UserID"
    WHERE 
        RH."SubjectIdentifier" = id
        AND P."ImageType" = 1 
        AND P."CurrentSelected" = 1;
END;
$BODY$;

ALTER FUNCTION public.roomiegetrentalhistory(uuid)
    OWNER TO postgres;
