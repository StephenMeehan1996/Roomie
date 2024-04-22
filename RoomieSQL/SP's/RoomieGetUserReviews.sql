
CREATE OR REPLACE FUNCTION public.roomiegetuserreviews(
	id uuid)
    RETURNS TABLE(reviewdate date, authorfirstname character varying, authorsecondname character varying, authorprofile character varying, authoridentifier uuid, reviewtitle character varying, reviewtext character varying, reviewstatus integer, reviewid integer) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
BEGIN
    RETURN QUERY 
    SELECT 
        RD."ReviewDate",
        U."FirstName" AS AuthorFirstName,
        U."SecondName" AS AuthorSecondName,
        P."ImageUrl" AS AuthorProfile,
        U."UserIdentifier" AS AuthorIdentifier,
        RD."ReviewTitle",
        RD."ReviewText",
        RD."ReviewStatus",
		RD."ReviewDetailID"
    FROM 
        public."ReviewDetailTBL" AS RD
    INNER JOIN 
        public."UserTBL" AS U ON RD."AuthorIdentifier" = U."UserIdentifier"
    INNER JOIN
        Public."ProfileImageTBL" AS P ON P."UserID" = U."UserID"
    WHERE 
        RD."SubjectIdentifier" = id
        AND P."ImageType" = 1 
        AND P."CurrentSelected" = 1;
END;
$BODY$;

ALTER FUNCTION public.roomiegetuserreviews(uuid)
    OWNER TO postgres;
