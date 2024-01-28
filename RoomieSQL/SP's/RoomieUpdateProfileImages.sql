CREATE OR REPLACE FUNCTION public.roomieupdateprofileimages(
	in_imageid integer,
	in_imagetype integer,
	in_uuid uuid,
	in_id integer)
    RETURNS void
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
BEGIN
	UPDATE public."ProfileImageTBL"
    SET
        "CurrentSelected" = 0
    WHERE
        "UserID" = In_ID AND "ImageType" = In_ImageType;

	
    UPDATE public."ProfileImageTBL"
    SET
        "CurrentSelected" = 1,
        "ImageType" = In_ImageType
    WHERE
        "ProfileImageID" = In_ImageID;
END;
$BODY$;

ALTER FUNCTION public.roomieupdateprofileimages(integer, integer, uuid, integer)
    OWNER TO postgres;
