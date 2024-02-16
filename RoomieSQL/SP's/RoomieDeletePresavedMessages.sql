CREATE OR REPLACE FUNCTION public.roomiedeletepresavedmessages(
	id integer)
    RETURNS void
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
BEGIN
    DELETE FROM 
		public."UserPresavedMessageTBL" WHERE "UsePresavedMessageID" = id;
END;
$BODY$;

ALTER FUNCTION public.roomiedeletepresavedmessages(integer)
    OWNER TO postgres;
