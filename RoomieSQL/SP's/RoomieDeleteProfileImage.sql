CREATE OR REPLACE FUNCTION public.roomiedeleteprofileimage(
	in_imageid integer,
	in_uuid uuid)
    RETURNS void
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
BEGIN
    DELETE FROM public."ProfileImageTBL"
    WHERE "ProfileImageID" = In_ImageID;
	
	
END;
$BODY$;

ALTER FUNCTION public.roomiedeleteprofileimage(integer, uuid)
    OWNER TO postgres;
