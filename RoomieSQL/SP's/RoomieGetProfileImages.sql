CREATE OR REPLACE FUNCTION public.roomiegetprofileimages(
	id uuid)
    RETURNS TABLE(_useridentifier uuid, profileimageid integer, imagetype integer, currentselected integer, imageurl character varying) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
BEGIN
    RETURN QUERY
    SELECT 
		U."UserIdentifier",
		PI."ProfileImageID",
		PI."ImageType",
		PI."CurrentSelected",
		PI."ImageUrl"
    FROM
        public."UserTBL" U
	
		LEFT JOIN
			public."ProfileImageTBL" PI ON PI."UserID" = U."UserID"
    WHERE -- b8cf3efc-96f5-4cd5-90cf-3d342a8e124a
        U."UserIdentifier" = Id;
END;
$BODY$;

ALTER FUNCTION public.roomiegetprofileimages(uuid)
    OWNER TO postgres;
