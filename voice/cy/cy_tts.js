// IMPLEMENTED (X) or MISSING ( ) FEATURES, (N/A) if not needed in this language:
//
// (X) Basic navigation prompts: route (re)calculated (with distance and time support), turns, roundabouts, u-turns, straight/follow, arrival
// (X) Announce nearby point names (destination / intermediate / GPX waypoint / favorites / POI)
// (X) Attention prompts: SPEED_CAMERA; SPEED_LIMIT; BORDER_CONTROL; RAILWAY; TRAFFIC_CALMING; TOLL_BOOTH; STOP; PEDESTRIAN; MAXIMUM; TUNNEL
// (X) Other prompts: gps lost, off route, back to route
// (X) Street name and prepositions (onto / on / to) and street destination (toward) support
// (X) Distance unit support (meters / feet / yards)
// (X) Special grammar: WELSH (CY) numerals (decimal system) and count structures, mutations, feminine forms
// (X) Support announcing highway exits

var metricConst;
var tts;
var dictionary = {};

//// STRINGS
////////////////////////////////////////////////////////////////
function populateDictionary(tts) {
	// ROUTE CALCULATED
	dictionary["route_is"] = tts ? "Mae'r daith" : "route_is.ogg";
	dictionary["route_calculate"] = tts ? "Wedi ail-gyfrifo'r daith." : "route_calculate.ogg";
	dictionary["distance"] = tts ? "pellter" : "distance.ogg";

	// LEFT/RIGHT
	dictionary["after"] = tts ? "ar ôl" : "after.ogg";
	dictionary["in"] = tts ? "ymhen" : "in.ogg";

	dictionary["left"] = tts ? "trowch i'r chwith" : "left.ogg";
	dictionary["right"] = tts ? "trowch i'r dde" : "right.ogg";
	dictionary["left_sh"] = tts ? "trowch yn union i'r chwith" : "left_sh.ogg";
	dictionary["right_sh"] = tts ? "trowch yn union i'r dde" : "right_sh.ogg";
	dictionary["left_sl"] = tts ? "trowch tua'r chwith" : "left_sl.ogg";
	dictionary["right_sl"] = tts ? "trowch tua'r dde" : "right_sl.ogg";
	dictionary["left_keep"] = tts ? "cadwch i'r chwith" : "left_keep.ogg";
	dictionary["right_keep"] = tts ? "cadwch i'r dde" : "right_keep.ogg";
	dictionary["left_bear"] = tts ? "parhewch tua'r chwith" : "left_bear.ogg";   
	dictionary["right_bear"] = tts ? "parhewch tua'r dde" : "right_bear.ogg";  

	// U-TURNS
	dictionary["make_uturn"] = tts ? "gwnewch dro pedol" : "make_uturn.ogg";
	dictionary["make_uturn_wp"] = tts ? "pan yn bosib, gwnewch dro pedol" : "make_uturn_wp.ogg";

	// ROUNDABOUTS
	dictionary["prepare_roundabout"] = tts ? "ymunwch â chylchfan" : "prepare_roundabout.ogg";
	dictionary["roundabout"] = tts ? "ymunwch â'r gylchfan" : "roundabout.ogg";
	dictionary["then"] = tts ? "yna" : "then.ogg";
	dictionary["and"] = tts ? "a" : "and.ogg";
	dictionary["and_ac"] = tts ? "ac" : "and_ac.ogg";
	dictionary["take"] = tts ? "cymerwch" : "take.ogg";
	dictionary["and_take"] = tts ? "a chymryd" : "and_take.ogg";
	dictionary["exit"] = tts ? "allanfa" : "exit.ogg";

	dictionary["1st_exit"] = tts ? "yr allanfa gyntaf" : "1st_exit.ogg";
	dictionary["2nd"] = tts ? "yr ail" : "2nd.ogg";
	dictionary["3rd"] = tts ? "y drydedd" : "3rd.ogg";		// Welsh feminine form for use with 'allanfa'
	dictionary["4th"] = tts ? "y bedwaredd" : "4th.ogg";	// Welsh feminine form for use with 'allanfa'
	dictionary["5th"] = tts ? "y bumed" : "5th.ogg";	// Welsh feminine form for use with 'allanfa'
	dictionary["6th"] = tts ? "y chweched" : "6th.ogg";	// Welsh feminine form for use with 'allanfa'
	dictionary["7th"] = tts ? "y seithfed" : "7th.ogg";	// Welsh feminine form for use with 'allanfa'
	dictionary["8th"] = tts ? "yr wythfed" : "8th.ogg";	// Welsh feminine form for use with 'allanfa'
	dictionary["9th"] = tts ? "y nawfed" : "9th.ogg";	// Welsh feminine form for use with 'allanfa'
	dictionary["10th"] = tts ? "y ddegfed" : "10th.ogg";	// Welsh feminine form for use with 'allanfa'
	dictionary["11th"] = tts ? "yr unfed ar ddeg" : "11th.ogg";	// Welsh feminine form for use with 'allanfa'
	dictionary["12th"] = tts ? "y ddeuddegfed" : "12th.ogg";	// Welsh feminine form for use with 'allanfa'
	dictionary["13th"] = tts ? "y drydedd ar ddeg" : "13th.ogg";	// Welsh feminine form for use with 'allanfa'
	dictionary["14th"] = tts ? "y bedwaredd ar ddeg" : "14th.ogg";	// Welsh feminine form for use with 'allanfa'
	dictionary["15th"] = tts ? "y bymthegfed" : "15th.ogg";	// Welsh feminine form for use with 'allanfa'
	dictionary["16th"] = tts ? "yr unfed ar bymtheg" : "16th.ogg";	// Welsh feminine form for use with 'allanfa'
	dictionary["17th"] = tts ? "yr ail ar bymthegfed" : "17th.ogg";	// Welsh feminine form for use with 'allanfa'

	// STRAIGHT/FOLLOW
	dictionary["go_ahead"] = tts ? "ewch syth ymlaen" : "go_ahead.ogg";
	dictionary["follow"] = tts ? "parhewch am" : "follow.ogg";  // "Follow the course of the road for" perceived as too chatty by many users

	// ARRIVE
	dictionary["and_arrive_destination"] = tts ? "a chyrraedd pen eich taith" : "and_arrive_destination.ogg";
	dictionary["reached_destination"] = tts ? "Rydych wedi cyrraedd pen eich taith" : "reached_destination.ogg";
	dictionary["and_arrive_intermediate"] = tts ? "a chyrraedd eich man stopio" : "and_arrive_intermediate.ogg";
	dictionary["reached_intermediate"] = tts ? "Rydych wedi cyrraedd eich man stopio" : "reached_intermediate.ogg";

	// NEARBY POINTS
	dictionary["and_arrive_waypoint"] = tts ? "a phasio pwynt llwybro ji pi ecs" : "and_arrive_waypoint.ogg";
	dictionary["reached_waypoint"] = tts ? "Rydych yn pasio pwynt llwybro ji pi ecs" : "reached_waypoint.ogg";
	dictionary["and_arrive_favorite"] = tts ? "a phasio ffefryn" : "and_arrive_favorite.ogg";
	dictionary["reached_favorite"] = tts ? "Rydych yn pario ffefryn" : "reached_favorite.ogg";
	dictionary["and_arrive_poi"] = tts ? "a phasio pwynt diddordeb" : "and_arrive_poi.ogg";
	dictionary["reached_poi"] = tts ? "Rydych yn pasio pwynt diddordeb" : "reached_poi.ogg";

	// ATTENTION
	//dictionary["exceed_limit"] = tts ? "You are exceeding the speed limit" : "exceed_limit.ogg";
	dictionary["exceed_limit"] = tts ? "cyfyngiad cyflymder" : "exceed_limit.ogg";
	dictionary["attention"] = tts ? "rhybudd" : "attention.ogg";
	dictionary["speed_camera"] = tts ? "camera cyflymder" : "speed_camera.ogg";
	dictionary["border_control"] = tts ? "rheolaeth ffin" : "border_control.ogg";
	dictionary["railroad_crossing"] = tts ? "croesfan rheilffordd" : "railroad_crossing.ogg";
	dictionary["traffic_calming"] = tts ? "ardal tawelu traffig" : "traffic_calming.ogg";
	dictionary["toll_booth"] = tts ? "tolldy" : "toll_booth.ogg";
	dictionary["stop"] = tts ? "arwydd stopio" : "stop.ogg";
	dictionary["pedestrian_crosswalk"] = tts ? "croesfan cerddwyr" : "pedestrian_crosswalk.ogg";
	dictionary["tunnel"] = tts ? "twnnel" : "tunnel.ogg";

	// OTHER PROMPTS
	dictionary["location_lost"] = tts ? "wedi colli signal ji pi es" : "location_lost.ogg";
	dictionary["location_recovered"] = tts ? "wedi ail-ddarganfod signal ji pi es" : "location_recovered.ogg";
	dictionary["off_route"] = tts ? "Rydych oddi ar y llwybr ers" : "off_route.ogg";
	dictionary["back_on_route"] = tts ? "Rydych yn ôl ar y llwybr" : "back_on_route.ogg";

	// STREET NAME PREPOSITIONS
	dictionary["onto"] = tts ? "ar" : "on.ogg";
	dictionary["on"] = tts ? "ar" : "on.ogg";    // is used if you turn together with your current street, i.e. street name does not change.
	dictionary["to"] = tts ? "i" : "to.ogg";
	dictionary["toward"] = tts ? "tuag at" : "toward.ogg";

	// DISTANCE UNIT SUPPORT
	dictionary["around"] = tts ? "tua" : "around.ogg";
	dictionary["half"] = tts ? "hanner" : "half.ogg";
	dictionary["quarter"] = tts ? "chwarter" : "quarter.ogg";
	
	dictionary["meter"] = tts ? "metr" : "meter.ogg";
	dictionary["kilometer"] = tts ? "cilomedr" : "kilometer.ogg";
	dictionary["kilometer_soft"] = tts ? "gilomedr" : "kilometer_soft.ogg";
	dictionary["kilometer_hard"] = tts ? "chilomedr" : "kilometer_hard.ogg";
	
	dictionary["foot"] = tts ? "troedfedd" : "foot.ogg";
	dictionary["yard"] = tts ? "llath" : "yard.ogg";
	dictionary["mile"] = tts ? "milltir" : "mile.ogg";
	dictionary["mile_soft"] = tts ? "filltir" : "mile_soft.ogg";

	// TIME SUPPORT
	dictionary["less_than"] = tts ? "llai na" : "less_than.ogg";
	dictionary["time"] = tts ? "amser" : "time.ogg";
	dictionary["hour"] = tts ? "awr" : "hour.ogg";
	dictionary["minute"] = tts ? "munud" : "minute.ogg";
	dictionary["minute_soft"] = tts ? "funud" : "minute_soft.ogg";
	
}

//// COMMAND BUILDING / WORD ORDER
////////////////////////////////////////////////////////////////
function setMetricConst(metrics) {
	metricConst = metrics;
}

function setMode(mode) {
	tts = mode;
	populateDictionary(mode);
}

function route_new_calc(dist, timeVal) {
	return dictionary["route_is"] + " " + distance(dist) + " " + dictionary["time"] + " " + time(timeVal) + (tts ? ". " : " ");
}

function distance(dist) {
	switch (metricConst) {
		case "km-m":
			if (dist < 17 ) {
				return (tts ? Math.round(dist).toString() : ogg_dist(Math.round(dist))) + " " + dictionary["meter"];
			} else if (dist < 100) {
				return (tts ? (Math.round(dist/10.0)*10).toString() : ogg_dist(Math.round(dist/10.0)*10)) + " " + dictionary["meter"];
			} else if (dist < 1000) {
				return (tts ? (Math.round(2*dist/100.0)*50).toString() : ogg_dist(Math.round(2*dist/100.0)*50)) + " " + dictionary["meter"];
			} else if (dist < 1500) {
				return dictionary["around"] + " " + dictionary["kilometer"];
			} else if (dist < 2500) {
				return dictionary["around"] + " " + "2.ogg " + dictionary["kilometer_soft"];
			} else if (dist < 3500) {
				return dictionary["around"] + " " + "3.ogg " + dictionary["kilometer_hard"];
			} else if (dist > 5500 && dist < 6500) {
				return dictionary["around"] + " " + "6.ogg " + dictionary["kilometer_hard"];
			} else if (dist < 10000) {
				return dictionary["around"] + " " + (tts ? Math.round(dist/1000.0).toString() : ogg_dist(Math.round(dist/1000.0))) + " " + dictionary["kilometer"];
			} else {
				return (tts ? Math.round(dist/1000.0).toString() : ogg_dist(Math.round(dist/1000.0))) + " " + dictionary["kilometer"];
			}
			break;
		case "mi-f":
			if (dist < 350) {
				return (tts ? (Math.round(2*dist/100.0/0.3048)*50).toString() : ogg_dist(Math.round(2*dist/100.0/0.3048)*50)) + " " + dictionary["foot"];
			} else if (dist < 603) {
				return dictionary["quarter"] + " " + dictionary["mile"];
			} else if (dist < 1005) {
				return dictionary["half"] + " " + dictionary["mile"];
			} else if (dist < 1408) {
				return "3.ogg " + dictionary["quarter"] + " " + dictionary["mile"];
			} else if (dist < 2414) {
				return dictionary["around"] + " " + dictionary["mile"];
			} else if (dist < 4022) {
				return dictionary["around"] + " " + "2_fem.ogg " + dictionary["mile_soft"];
			} else if (dist < 16093) {
				return dictionary["around"] + " " + (tts ? Math.round(dist/1609.3).toString() : ogg_dist_fem(Math.round(dist/1609.3))) + " " + dictionary["mile"];
			} else {
				return (tts ? Math.round(dist/1609.3).toString() : ogg_dist_fem(Math.round(dist/1609.3))) + " " + dictionary["mile"];
			}
			break;		
		case "mi-m":
			if (dist > 1.5 && dist < 2.5) {
				return "2.ogg " + dictionary["meter_soft"];
			} else if (dist < 17) {
				return (tts ? Math.round(dist).toString() : ogg_dist(Math.round(dist))) + " " + dictionary["meter"];
			} else if (dist < 100) {
				return (tts ? (Math.round(dist/10.0)*10).toString() : ogg_dist(Math.round(dist/10.0)*10)) + " " + dictionary["meter"];
			} else if (dist < 1300) {
				return (tts ? (Math.round(2*dist/100.0)*50).toString() : ogg_dist(Math.round(2*dist/100.0)*50)) + " " + dictionary["meter"];
			} else if (dist < 2414) {
				return dictionary["around"] + " " + dictionary["mile"];
			} else if (dist < 4022) {
				return dictionary["around"] + " " + "2_fem.ogg " + dictionary["mile_soft"];
			} else if (dist < 16093) {
				return dictionary["around"] + " " + (tts ? Math.round(dist/1609.3).toString() : ogg_dist_fem(Math.round(dist/1609.3))) + " " + dictionary["mile"];
			} else {
				return (tts ? Math.round(dist/1609.3).toString() : ogg_dist_fem(Math.round(dist/1609.3))) + " " + dictionary["mile"];
			}
			break;
		case "mi-y":
			if (dist > 0.46 && dist < 1.37) {
				return "2_fem.ogg " + dictionary["yard_soft"];
			} else if (dist < 17) {
				return (tts ? Math.round(dist/0.9144).toString() : ogg_dist_fem(Math.round(dist/0.9144))) + " " + dictionary["yard"];
			} else if (dist < 100) {
				return (tts ? (Math.round(dist/10.0/0.9144)*10).toString() : ogg_dist_fem(Math.round(dist/10.0/0.9144)*10)) + " " + dictionary["yard"];
			} else if (dist < 1300) {
				return (tts ? (Math.round(2*dist/100.0/0.9144)*50).toString() : ogg_dist_fem(Math.round(2*dist/100.0/0.9144)*50)) + " " + dictionary["yard"]; 
			} else if (dist < 2414) {
				return dictionary["around"] + " " + dictionary["mile"];
			} else if (dist < 4022) {
				return dictionary["around"] + "2_fem.ogg " + dictionary["mile_soft"];
			} else if (dist < 16093) {
				return dictionary["around"] + " " + (tts ? Math.round(dist/1609.3).toString() : ogg_dist_fem(Math.round(dist/1609.3))) + " " + dictionary["mile"];
			} else {
				return (tts ? Math.round(dist/1609.3).toString() : ogg_dist_fem(Math.round(dist/1609.3))) + " " + dictionary["mile"];
			}
			break;
	}
}

function time(seconds) {
	var minutes = Math.round(seconds/60.0);
	var oggMinutes = Math.round(((seconds/300.0) * 5));
	if (seconds < 30) {
		return dictionary["less_than"] + " " + dictionary["minute"];
	} else if (minutes % 60 == 0 && tts) {
		return hours(minutes); 
	} else if (minutes == 2) {
		return " " + "2.ogg " + " " + dictionary["minute_soft"];
	} else if (minutes % 60 == 2) {
		return hours(minutes) + " " + "and.ogg " + "2.ogg " + dictionary["minute_soft"];
	} else if (tts) {
		return hours(minutes) + " " + (minutes % 60) + " " + dictionary["minute"];
	} else if (!tts && seconds < 300) {
		return ogg_dist(minutes) + dictionary["minute"];
	} else if (!tts && oggMinutes < 60) {
		return hours(oggMinutes) + " " + ogg_dist(oggMinutes % 60) + dictionary["minute"];
	} else if (!tts && oggMinutes % 60 > 0) {
		return hours(oggMinutes) + " " + ogg_dist_and(oggMinutes % 60) + dictionary["minute"];
	} else if (!tts) {
		return hours(oggMinutes);
	}
}

function hours(minutes) {
	if (minutes < 60) {
		return "";
	} else {
		var hours = Math.floor(minutes / 60);
        return  (tts ? hours.toString() : ogg_dist_fem(hours)) + " " + dictionary["hour"]; 
	}
}

function route_recalc(dist, seconds) {
	return dictionary["route_calculate"] + " " + dictionary["distance"] + " " + distance(dist) + " " + dictionary["time"] + " " + time(seconds) + (tts ? ". " : " ");
}

function go_ahead(dist, streetName) {
	if (dist == -1) {
		return dictionary["go_ahead"];
	} else {
		return dictionary["follow"] + " " + distance(dist) + " " + follow_street(streetName);
	}
}

function follow_street(streetName) {
	if ((streetName["toDest"] === "" && streetName["toStreetName"] === "" && streetName["toRef"] === "") || Object.keys(streetName).length == 0 || !tts) {
		return "";
	} else if (streetName["toStreetName"] === "" && streetName["toRef"] === "") {
		return dictionary["to"] + " " + streetName["toDest"];
	} else if (streetName["toRef"] === streetName["fromRef"] && streetName["toStreetName"] === streetName["fromStreetName"] || 
			(streetName["toRef"] == streetName["fromRef"] && streetName["toStreetName"] == "")) {
		return dictionary["on"] + " " + assemble_street_name(streetName);
	} else if (!(streetName["toRef"] === streetName["fromRef"] && streetName["toStreetName"] === streetName["fromStreetName"])) {
		return dictionary["to"] + " " + assemble_street_name(streetName);
	}
}

function turn(turnType, dist, streetName) {
	if (dist == -1) {
		return getTurnType(turnType) + " " + turn_street(streetName);
	} else {
		return dictionary["in"] + " " + distance(dist) + (tts ? ", " : " ") + getTurnType(turnType) + " " + turn_street(streetName); 
	}
}

function take_exit(turnType, dist, exitString, exitInt, streetName) {
	if (dist == -1) {
		return getTurnType(turnType) + " " + dictionary["onto"] + " " + getExitNumber(exitString, exitInt) + " " + take_exit_name(streetName)
	} else {
		return dictionary["in"] + " " + distance(dist) + (tts ? ", " : " ")
			+ getTurnType(turnType) + " " + dictionary["onto"] + " " + getExitNumber(exitString, exitInt) + " " + take_exit_name(streetName)
	}
}

function take_exit_name(streetName) {
	if (Object.keys(streetName).length == 0 || (streetName["toDest"] === "" && streetName["toStreetName"] === "") || !tts) {
		return "";
	} else if (streetName["toDest"] != "") {
		return (tts ? ", " : " ") + streetName["toStreetName"] + " " + dictionary["toward"] + " " + streetName["toDest"];
	} else if (streetName["toStreetName"] != "") {
		return (tts ? ", " : " ") + streetName["toStreetName"]
	} else {
		return "";
	}
}

function getExitNumber(exitString, exitInt) {
	if (!tts && exitInt > 0) {
		return dictionary["exit"] + " " + (exitInt).toString() + ".ogg ";
	} else if (tts) {
		return dictionary["exit"] + " " + exitString;
	} else {
		return dictionary["exit"];
	}
}

function getTurnType(turnType) {
	switch (turnType) {
		case "left":
			return dictionary["left"];
			break;
		case "left_sh":
			return dictionary["left_sh"];
			break;
		case "left_sl":
			return dictionary["left_sl"];
			break;
		case "right":
			return dictionary["right"];
			break;
		case "right_sh":
			return dictionary["right_sh"];
			break;
		case "right_sl":
			return dictionary["right_sl"];
			break;
		case "left_keep":
			return dictionary["left_keep"];
			break;
		case "right_keep":
			return dictionary["right_keep"];
			break;
	}
}

function then() {
	return (tts ? ", " : " ") + dictionary["then"] + " ";
}

function roundabout(dist, angle, exit, streetName) {
	if (dist == -1) {
		return dictionary["take"] + " " + nth(exit) + " " + turn_street(streetName);
	} else {
		return dictionary["in"] + " " + distance(dist) + " " + dictionary["roundabout"] + (tts ? ", " : " ") + dictionary["and_take"] + " " + nth(exit) + " " + turn_street(streetName);
	}
}

function turn_street(streetName) {
	if (Object.keys(streetName).length == 0 || (streetName["toDest"] === "" && streetName["toStreetName"] === "" && streetName["toRef"] === "") || !tts) {
		return "";
	} else if (streetName["toStreetName"] === "" && streetName["toRef"] === "") {
		return dictionary["toward"] + " " + streetName["toDest"];
	} else if (streetName["toRef"] === streetName["fromRef"] && streetName["toStreetName"] === streetName["fromStreetName"]) {
		return dictionary["on"] + " " + assemble_street_name(streetName);
	} else if ((streetName["toRef"] === streetName["fromRef"] && streetName["toStreetName"] === streetName["fromStreetName"]) 
		|| (streetName["toStreetName"] === "" && streetName["toRef"] === streetName["fromRef"])) {
		return dictionary["on"] + " " + assemble_street_name(streetName);
	} else if (!(streetName["toRef"] === streetName["fromRef"] && streetName["toStreetName"] === streetName["fromStreetName"])) {
		return dictionary["onto"] + " " + assemble_street_name(streetName);
	}
	return "";
}

function assemble_street_name(streetName) {
	if (streetName["toDest"] === "") {
		return streetName["toRef"] + " " + streetName["toStreetName"];
	} else if (streetName["toRef"] === "") {
		return streetName["toStreetName"] + " " + dictionary["toward"] + " " + streetName["toDest"];
	} else if (streetName["toRef"] != "") {
		return streetName["toRef"] + " " + dictionary["toward"] + " " + streetName["toDest"];
	}
}

function nth(exit) {
	switch (exit) {
		case (1):
			return dictionary["1st_exit"];
		case (2):
			return dictionary["2nd"] + " " + dictionary["exit"];
		case (3):
			return dictionary["3rd"] + " " + dictionary["exit"];
		case (4):
			return dictionary["4th"] + " " + dictionary["exit"];
		case (5):
			return dictionary["5th"] + " " + dictionary["exit"];
		case (6):
			return dictionary["6th"] + " " + dictionary["exit"];
		case (7):
			return dictionary["7th"] + " " + dictionary["exit"];
		case (8):
			return dictionary["8th"] + " " + dictionary["exit"];
		case (9):
			return dictionary["9th"] + " " + dictionary["exit"];
		case (10):
			return dictionary["10th"] + " " + dictionary["exit"];
		case (11):
			return dictionary["11th"];
		case (12):
			return dictionary["12th"];
		case (13):
			return dictionary["13th"];
		case (14):
			return dictionary["14th"];
		case (15):
			return dictionary["15th"];
		case (16):
			return dictionary["16th"];
		case (17):
			return dictionary["17th"];
	}
}

function make_ut(dist, streetName) {
	if (dist == -1) {
		return dictionary["make_uturn"] + " " + turn_street(streetName);
	} else {
		return dictionary["in"] + " " + distance(dist) + " " + dictionary["make_uturn"] + " " + turn_street(streetName);
	}
}

function bear_left(streetName) {
	return dictionary["left_bear"];
}

function bear_right(streetName) {
	return dictionary["right_bear"];
}

function prepare_make_ut(dist, streetName) {
	return dictionary["after"] + " " + distance(dist) + " " + dictionary["make_uturn"] + " " + turn_street(streetName);
}

function prepare_turn(turnType, dist, streetName) {
	return dictionary["after"] + " " + distance(dist) + (tts ? ", " : " ") + getTurnType(turnType) + " " + turn_street(streetName);
}

function prepare_roundabout(dist, exit, streetName) {
	return dictionary["after"] + " " + distance(dist) + " " + dictionary["prepare_roundabout"]; 
}

function and_arrive_destination(dest) {
	return dictionary["and_arrive_destination"] + " " + dest;
}

function and_arrive_intermediate(dest) {
	return dictionary["and_arrive_intermediate"] + " " + dest;
}

function and_arrive_waypoint(dest) {
	return dictionary["and_arrive_waypoint"] + " " + dest;
}

function and_arrive_favorite(dest) {
	return dictionary["and_arrive_favorite"] + " " + dest;
}

function and_arrive_poi(dest) {
	return dictionary["and_arrive_poi"] + " " + dest;
}

function reached_destination(dest) {
	return dictionary["reached_destination"] + " " + dest;
}

function reached_waypoint(dest) {
	return dictionary["reached_waypoint"] + " " + dest;
}

function reached_intermediate(dest) {
	return dictionary["reached_intermediate"] + " " + dest;
}

function reached_favorite(dest) {
	return dictionary["reached_favorite"] + " " + dest;
}

function reached_poi(dest) {
	return dictionary["reached_poi"] + " " + dest;
}

function location_lost() {
	return dictionary["location_lost"];
}

function location_recovered() {
	return dictionary["location_recovered"];
}

function off_route(dist) {
	return dictionary["off_route"] + " " + distance(dist);
}

function back_on_route() {
	return dictionary["back_on_route"];
}

function make_ut_wp() {
	return dictionary["make_uturn_wp"];
}

// TRAFFIC WARNINGS
function speed_alarm(maxSpeed, speed) {
	return dictionary["exceed_limit"] + " " + maxSpeed.toString();
}

function attention(type) {
	return dictionary["attention"] + (tts ? ", " : " ") + getAttentionString(type);
}

function getAttentionString(type) {
	switch (type) {
		case "SPEED_CAMERA":
			return dictionary["speed_camera"];
			break;
		case "SPEED_LIMIT":
			return "";
			break
		case "BORDER_CONTROL":
			return dictionary["border_control"];
			break;
		case "RAILWAY":
			return dictionary["railroad_crossing"];
			break;
		case "TRAFFIC_CALMING":
			return dictionary["traffic_calming"];
			break;
		case "TOLL_BOOTH":
			return dictionary["toll_booth"];
			break;
		case "STOP":
			return dictionary["stop"];
			break;
		case "PEDESTRIAN":
			return dictionary["pedestrian_crosswalk"];
			break;
		case "MAXIMUM":
			return "";
			break;
		case "TUNNEL":
			return dictionary["tunnel"];
			break;
		default:
			return "";
			break;
	}
}

// DISTANCE MEASURE
function ogg_dist(distance) {
	if (distance == 0) {
		return "";
	} else if (distance < 11) {
		return Math.floor(distance).toString() + ".ogg ";
	} else if (distance > 19 && distance < 30) {
		return "2.ogg " + "10_soft.ogg " + ogg_dist(distance - 20);
	} else if (distance > 49 && distance < 70) {
		return Math.floor(distance / 10).toString() + "_short.ogg " + " " + "10.ogg " + ogg_dist(distance % 10);	
	} else if (distance < 100) {
		return Math.floor(distance / 10).toString() + ".ogg " + " " + "10.ogg " + ogg_dist(distance % 10);	
	} else if (distance < 200) {
		return "100.ogg " + ogg_dist_and(distance - 100);
	} else if (distance < 300) {
		return "2.ogg " + "100_soft.ogg " + ogg_dist_and(distance - 200);
	} else if (distance < 400) {
		return "3.ogg " + "100_hard.ogg " + ogg_dist_and(distance - 300);
	} else if (distance < 500) {
		return "4.ogg " + "100.ogg " + ogg_dist_and(distance - 400);
	} else if (distance < 600) {
		return "5_short.ogg " + "100.ogg " + ogg_dist_and(distance - 500);
	} else if (distance < 700) {
		return "6_short.ogg " + "100_hard.ogg " + ogg_dist_and(distance - 600);
	} else if (distance < 1000) {
		return Math.floor(distance / 100).toString() + ".ogg " + "100.ogg " + ogg_dist_and(distance % 100);
	} else if (distance > 1999 && distance < 3000 ) {
		return "2_fem.ogg " + "1000_soft.ogg " + ogg_dist(distance % 1000);
	} else if (distance > 2999 && distance < 7000 ) {
		return ogg_dist(distance/1000).toString + "_fem.ogg " + "1000.ogg " + ogg_dist(distance % 1000);
	} else {
		return ogg_dist(distance/1000) + "1000.ogg " + ogg_dist(distance % 1000);
	}
}

// DISTANCE MEASURE WELSH FEMININE
function ogg_dist_fem(distance) {
	if (distance == 0) {
		return "";
	} else if (distance > 1 && distance < 5) {
		return Math.floor(distance).toString() + "_fem.ogg ";
	} else {
		return ogg_dist(distance);
	}
}

// DISTANCE MEASURE WELSH AND - A/AC
function ogg_dist_and(distance) {
	if (distance == 0) {
		return "";
	} else if (distance == 1 || distance == 8) {
		return "and_ac.ogg " + ogg_dist(distance);
	} else if (distance > 2 && distance < 6) {
		return "and.ogg "  + Math.floor(distance).toString() + "_hard.ogg ";
	} else if (distance > 10 && distance < 20 ) {
		return "and_ac.ogg " + ogg_dist(distance);
	} else if (distance > 79 && distance < 90 ) {
		return "and_ac.ogg " + ogg_dist(distance);
	} else if (distance > 29 && distance < 50 ) {
		return "and.ogg " + Math.floor(distance/10).toString() + "_hard.ogg " + "10.ogg " + ogg_dist(distance % 10);
	} else if (distance > 49 && distance < 60 ) {
		return "and.ogg " + "5_hard_short.ogg " + "10.ogg " + ogg_dist(distance % 10);
	} else if (distance > 59 && distance < 70 ) {
		return "and.ogg " + "6_short.ogg " + "10.ogg " + ogg_dist(distance % 10);
	} else {
		return "and.ogg " + ogg_dist(distance);
	}
}

