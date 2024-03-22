-- FUNCTION: public.roomieupdaterentalpreferences(uuid, numeric, numeric, text, text, text, text, numeric, numeric, numeric, text, numeric, numeric, text, text, numeric, text)

-- DROP FUNCTION IF EXISTS public.roomieupdaterentalpreferences(uuid, numeric, numeric, text, text, text, text, numeric, numeric, numeric, text, numeric, numeric, text, text, numeric, text);

CREATE OR REPLACE FUNCTION public.roomieupdaterentalpreferences(
	in_uid uuid,
	in_house_share_price_max numeric,
	in_house_share_price_min numeric,
	in_house_share_room_type text,
	in_house_share_house_type text,
	in_house_share_envoirnment text,
	in_housemate_expect text,
	in_house_rental_price_max numeric,
	in_house_rental_price_min numeric,
	in_house_rental_num_rooms numeric,
	in_house_rental_house_type text,
	in_digs_price_max numeric,
	in_digs_price_min numeric,
	in_digs_room_type text,
	in_digs_days text,
	in_digs_meals_included numeric,
	in_digs_house_type text)
    RETURNS void
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
DECLARE
	user_id INTEGER;

BEGIN
 	
	SELECT 
		"UserID" INTO user_id
    FROM 
		public."UserTBL"
    WHERE 
		"UserIdentifier" = in_uid;
	
	UPDATE 
		public."RentalPreferencesTBL" 
    SET 
		"HouseSharePriceMax" = in_house_share_price_max,
		"HouseSharePriceMin" = in_house_share_price_min,
		"HouseShareRoomType" = in_house_share_room_type,
		"HouseShareHouseType" = in_house_share_house_type,
		"HouseShareEnvoirnment" = in_house_share_envoirnment,
		"HousemateExpect" = in_housemate_expect,
		"HouseRentalPriceMax" = in_house_rental_price_max,
		"HouseRentalPriceMin" = in_house_rental_price_min,
		"HouseRentalNumRooms" = in_house_rental_num_rooms,
		"HouseRentalHouseType" = in_house_rental_house_type,
		"DigsPriceMax" = in_digs_price_max,
		"DigsPriceMin" = in_digs_price_min,
		"DigsRoomType" = in_digs_room_type,
		"DigsDays" = in_digs_days,
		"DigsMealsIncluded" = in_digs_meals_included,
		"DigsHouseType" = in_digs_house_type
    WHERE 
		"UserID" = user_id;
	
END;
$BODY$;

ALTER FUNCTION public.roomieupdaterentalpreferences(uuid, numeric, numeric, text, text, text, text, numeric, numeric, numeric, text, numeric, numeric, text, text, numeric, text)
    OWNER TO postgres;
