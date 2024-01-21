CREATE OR REPLACE FUNCTION public.roomiegetuseruuid(
	email character varying)
    RETURNS TABLE(useridentifier uuid) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
BEGIN
    RETURN QUERY
    SELECT 
		U."UserIdentifier"
    FROM
        public."UserTBL" U
    WHERE -- b8cf3efc-96f5-4cd5-90cf-3d342a8e124a
        U."Email" = email;
END;
$BODY$;

ALTER FUNCTION public.roomiegetuseruuid(character varying)
    OWNER TO postgres;
