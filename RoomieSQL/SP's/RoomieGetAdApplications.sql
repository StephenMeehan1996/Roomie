CREATE OR REPLACE FUNCTION public.roomiegetadapplications(
	id integer)
    RETURNS TABLE(firstname character varying, secondname character varying, useridentifier uuid, bio character varying, appmessage text, appdate date, profileimage character varying, numreviews integer, positivereviews integer) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
BEGIN
    RETURN QUERY 
    SELECT DISTINCT
        U."FirstName",
        U."SecondName",
        U."UserIdentifier",
        PD."Bio",
        AA."Message",
        AA."Date",
        PI."ImageUrl" AS "ProfileImage",
		R."NumReviews",
		R."PositiveReviews"
		
    FROM 
        public."AdApplicationTBL" AA
    INNER JOIN
        public."AddTBL" A ON A."AddID" = AA."AdID"
    INNER JOIN
        public."UserTBL" U ON U."UserIdentifier" = AA."UserIdenifier"
    INNER JOIN
        public."ProfileDetailTBL" PD ON PD."UserID" = U."UserID"
	INNER JOIN
		public."ReviewTBL" R ON R."UserID" = U."UserID"
    LEFT JOIN LATERAL (
        SELECT "ImageUrl"
        FROM public."ProfileImageTBL" PIT
        WHERE PIT."UserID" = U."UserID" AND PIT."ImageType" = 1 AND PIT."CurrentSelected" = 1
        LIMIT 1
    ) PI ON true
    WHERE 
        A."AddID" = id;
END;
$BODY$;

ALTER FUNCTION public.roomiegetadapplications(integer)
    OWNER TO postgres;
