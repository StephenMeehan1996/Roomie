CREATE OR REPLACE FUNCTION public.roomiegetaddimages(
	addids integer[])
    RETURNS SETOF "AddImageTBL" 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
BEGIN
    RETURN QUERY SELECT * FROM public."AddImageTBL"  WHERE "AddID" = ANY(addids);
END;
$BODY$;

ALTER FUNCTION public.roomiegetaddimages(integer[])
    OWNER TO postgres;