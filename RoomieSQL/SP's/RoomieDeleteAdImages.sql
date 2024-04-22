CREATE OR REPLACE FUNCTION public.roomiedeleteadimage(
	in_imageid integer)
    RETURNS void
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
BEGIN
    DELETE FROM public."AddImageTBL"
    WHERE "AddImageID" = In_ImageID;
	
	
END;
$BODY$;

ALTER FUNCTION public.roomiedeleteadimage(integer)
    OWNER TO postgres;
