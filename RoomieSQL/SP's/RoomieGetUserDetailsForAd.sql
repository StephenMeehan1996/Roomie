-- FUNCTION: public.roomiegetuserdetailsforad(uuid)

-- DROP FUNCTION IF EXISTS public.roomiegetuserdetailsforad(uuid);

CREATE OR REPLACE FUNCTION public.roomiegetuserdetailsforad(
	in_id uuid)
    RETURNS TABLE(firstname character varying, secondname character varying, occupation character varying, occupationdetail character varying, bio character varying, numreviews integer, posistivereview integer) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
BEGIN
    RETURN QUERY
    SELECT
        U."FirstName",
		U."SecondName",
		O."OccupationTitle",
		O."OccupationDetail",
		P."Bio",
		R."NumReviews",
		R."PositiveReviews"
        location
    FROM
        public."UserTBL" U
	INNER JOIN
		public."OccupationTBL" O ON O."UserID" = U."UserID"
	INNER JOIN
		public."ProfileDetailTBL" P ON P."UserID" = U."UserID"
	INNER JOIN
		public."ReviewTBL" R ON R."UserID" = U."UserID"
    WHERE
        U."UserIdentifier" = in_id;
END;
$BODY$;

ALTER FUNCTION public.roomiegetuserdetailsforad(uuid)
    OWNER TO postgres;
