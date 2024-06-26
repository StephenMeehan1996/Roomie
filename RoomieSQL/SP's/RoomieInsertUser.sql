-- FUNCTION: public.roomieinsertuser(text, text, text, date, text, text, numeric, numeric, numeric, uuid, text, text, text, text, text, text, text, text, text, text, numeric, numeric, text, text, text, text, numeric, numeric, numeric, text, numeric, numeric, text, text, numeric, text)

-- DROP FUNCTION IF EXISTS public.roomieinsertuser(text, text, text, date, text, text, numeric, numeric, numeric, uuid, text, text, text, text, text, text, text, text, text, text, numeric, numeric, text, text, text, text, numeric, numeric, numeric, text, numeric, numeric, text, text, numeric, text);

CREATE OR REPLACE FUNCTION public.roomieinsertuser(
	in_email text,
	in_firstname text,
	in_secondname text,
	in_dob date,
	in_gender text,
	in_selected_preferences text,
	in_share_data numeric,
	in_share_name numeric,
	in_smoke numeric,
	in_user_identifier uuid,
	in_address_line1 text,
	in_address_line2 text,
	in_county text,
	in_city text,
	in_eircode text,
	in_bio text,
	in_intro_video_url text,
	in_occupation_title text,
	in_occupation_detail text,
	in_tagline text,
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
    v_user_id integer;
BEGIN
    INSERT INTO 
		public."UserTBL"("Email","FirstName","SecondName","Dob","Gender","SelectedPreferences","ShareData","ShareName","Smoke", "UserIdentifier")
    VALUES 
		(in_email,in_firstname,in_secondname,in_dob,in_gender,in_selected_preferences,in_share_data,in_share_name,in_smoke, in_user_identifier)
    RETURNING 
		"UserID" INTO v_user_id;
		
    INSERT INTO 
		public."AddressTBL"("UserID", "AddressLine1", "AddressLine2", "County", "City", "Eircode")
    VALUES 
		(v_user_id, in_address_line1, in_address_line2, in_county, in_city, in_eircode);
	
    INSERT INTO 
		public."ProfileDetailTBL"("UserID","Bio", "IntroVideoURL", "tagline", "EmailVerified", "NumberVerified" )
    VALUES 
		(v_user_id, in_bio, in_intro_video_url,in_tagline, 0, 0 );
	
	INSERT INTO 
		public."OccupationTBL"("UserID","OccupationTitle","OccupationDetail")
    VALUES 
		(v_user_id, in_occupation_title, in_occupation_detail);
	
	INSERT INTO 
		public."RentalPreferencesTBL"("UserID","HouseSharePriceMax","HouseSharePriceMin","HouseShareRoomType","HouseShareHouseType","HouseShareEnvoirnment","HousemateExpect","HouseRentalPriceMax","HouseRentalPriceMin","HouseRentalNumRooms","HouseRentalHouseType","DigsPriceMax","DigsPriceMin","DigsRoomType","DigsDays","DigsMealsIncluded","DigsHouseType")
    VALUES 
		(v_user_id,in_house_share_price_max,in_house_share_price_min,in_house_share_room_type,in_house_share_house_type,in_house_share_envoirnment,in_housemate_expect,in_house_rental_price_max,in_house_rental_price_min,in_house_rental_num_rooms,in_house_rental_house_type,in_digs_price_max,in_digs_price_min,in_digs_room_type,in_digs_days,in_digs_meals_included,in_digs_house_type );
		
	INSERT INTO 
		public."ReviewTBL"("UserID","PositiveReviews","NegitiveReviews","NumReviews")
    VALUES 
		(v_user_id, 0,0,0);
END;
$BODY$;

ALTER FUNCTION public.roomieinsertuser(text, text, text, date, text, text, numeric, numeric, numeric, uuid, text, text, text, text, text, text, text, text, text, text, numeric, numeric, text, text, text, text, numeric, numeric, numeric, text, numeric, numeric, text, text, numeric, text)
    OWNER TO postgres;
