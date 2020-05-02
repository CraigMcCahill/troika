    on("sheet:opened", function() {
        console.log("** Coriolis Third Horizon Character Sheet 2.5 by Nicolaj G. **")
        versioning();
    });

    on("change:strength change:agility", function() {
        update_hitpoints("strength", "agility");
    });

    on("change:wits change:empathy", function() {
        update_mindpoints("wits", "empathy");
    });

    on("change:strength", function() {
        update_carryMAX("strength");
    });

    var versioning = function() {
        console.log("Version Checking...")
        getAttrs(["version"], function(v) {
            if(v.version == undefined || v.version == "") {
                console.log("** UPGRADING TO v2.0 **");

                upgrade_to_2_0()
                setAttrs({version: 2.0});

                console.log("** DONE UPGRADING TO v2.0 **");
            }
            if(v.version == 2.0) {
                console.log("** UPGRADING TO v2.5 **");

                upgrade_to_2_5()
                setAttrs({version: 2.5});

                console.log("** DONE UPGRADING TO v2.5 **");
            }
            else {
                console.log("** Coriolis v2.5 by Nicolaj G. **");
                return;
            }
        });
    };

    var upgrade_to_2_0 = function() {

        update_number("pc", "sheetstyle");
        update_number("sty", "strength");
        update_number("kyl", "agility");
        update_number("skp", "wits");
        update_number("kns", "empathy");
        update_number("rorlighet", "dexterity");
        update_number("befal", "command");
        update_number("kraftprov", "force");
        update_number("horisontens_kultur", "culture");
        update_number("smyga", "infiltration");
        update_number("datadjinn", "datadjinn");
        update_number("manipulera", "manipulation");
        update_number("medikurgi", "medicurgy");
        update_number("narkamp", "melee-combat");
        update_number("mystiska_krafter", "mystic-powers");
        update_number("spaning", "observation");
        update_number("pilot", "pilot");
        update_number("skjutvape", "ranged-combat");
        update_number("vetenskap", "science");
        update_number("overlevnad", "survival");
        update_number("rustning_skydd", "armor_rating");
        update_number("skepp-manoverformaga", "spaceship-maneuverability");
        update_number("skepp-signatur", "spaceship-signature");
        update_number("skepp-hastighet", "spaceship-speed");
        update_number("skepp-pansar", "spaceship-armor");
        update_number("skepp-max-modulerderp", "spaceship-modules-max");
        update_number("captainnum", "captainskill");
        update_number("pilotnum", "pilotskill");
        update_number("sensoroperatornum", "sensoroperatorskill");
        update_number("gunnernum", "gunnerskill");
        update_number("engineernum", "engineerskill");
        update_number("teknologi", "technology");
        update_number("teknologi", "technology");
        update_number("teknologi", "technology");
        update_number("teknologi", "technology");
        update_number("teknologi", "technology");
        update_number("teknologi", "technology");

        update_text("namn", "name");
        update_text("bakgrund", "background");
        update_text("koncept", "concept");
        update_text("ikon", "icon");
        update_text("gruppkoncept", "groupconcept");
        update_text("pers_problem", "personal_problem");
        update_text("anseende", "reputation");
        update_text("ansikte", "face");
        update_text("rustning", "armor");
        update_text("rustning_ovrigt", "armor_comments");
        update_text("skepp-namn", "spaceship-name");
        update_text("skepp-typ", "spaceship-type");
        update_text("skepp-varv", "spaceship-yard");
        update_text("skepp-problem", "spaceship-problem");
        update_text("captain", "captain");
        update_text("sensoroperator", "sensoroperator");
        update_text("gunner", "gunner");
        update_text("engineer", "engineer");
        update_text("kladsel", "clothing");

        update_checkbox("trauma", "hitpoints-check", 12)
        update_checkbox("mind", "mindpoints-check", 12)
        update_checkbox("stp", "rad", 10)
        update_checkbox("erf", "exp", 20)
        update_checkbox("skepp-energi", "ep", 10)
        update_checkbox("skepp-kp", "space-hp", 20)

        update_repeating("repeating_krits", "repeating_crits", "krit-skador", "crit-injury");
        update_repeating("repeating_talanger", "repeating_talents", "talang", "talent");
        update_repeating("repeating_skepp-krits", "repeating_spaceship-crits", "skepp-krit-skador", "spaceship-crit-damage");
        update_repeating("repeating_utrustning", "repeating_gear", "utrustning", "gear", "utrustning_bonus", "gear_bonus");
        update_repeating("repeating_skepp-tillval", "repeating_spaceship-features", "skepp-tillvalsnamn", "spaceship-features-name", "skepp-tillval-bonus", "spaceship-features-bonus"); //2

        update_hitpoints("strength", "agility");
        update_mindpoints("wits", "empathy");
        update_carryMAX("strength");

        update_relationships();
        update_weapons();
        update_spaceship_module();
        update_spaceship_weaponsystem();
     };

    var upgrade_to_2_5 = function() {

        oldRepeating = "repeating_talents";
        oldAttribute = "items";
        newAttribute = "tiny-items";

        getSectionIDs(oldRepeating, function(idArray) {
            var update = {};
            update[newAttribute] = "";
            _.each(idArray, function(currentID) {
                getAttrs([oldRepeating + "_" + currentID + "_" + oldAttribute], function(v) {
                    if(v[oldRepeating + "_" + currentID + "_" + oldAttribute]) {
                        var newrowid = generateRowID();
                        update[newAttribute] += v[oldRepeating + "_" + currentID + "_" + oldAttribute] + "\n";
                        setAttrs(update);
                    }
                });
            });
        });

    };

    var update_text = function(oldAttribute, newAttribute) {
        console.log("Updating Text from: " + oldAttribute + " to: " + newAttribute);

        getAttrs([oldAttribute], function(v) {
            if(v[oldAttribute]) {
                var update = {};
                update[newAttribute] = v[oldAttribute];
                setAttrs(update, {silent: true});
            }
        });
    }

    var update_number = function(oldAttribute, newAttribute) {
        console.log("Updating number from: " + oldAttribute + " to: " + newAttribute);

        getAttrs([oldAttribute], function(v) {
            if(v[oldAttribute]) {
                var update = {};
                update[newAttribute] = parseInt(v[oldAttribute], 10);
                setAttrs(update, {silent: true});
            }
        });
    }

    var update_checkbox = function(oldAttribute, newAttribute, numberOfAttributes) {
        console.log("Updating checkbox from: " + oldAttribute + " to: " + newAttribute);
        var array = [];

        for(var i = 1; i <= numberOfAttributes; i++) {
            array.push(oldAttribute + i);
        }

        getAttrs(array, function(v) {
            for(var i = 1; i <= numberOfAttributes; i++) {
                var update = {};

                if( isNaN(parseInt(v[oldAttribute + i], 10)) ) {
                    update[newAttribute + i] = 0;
                    console.log(oldAttribute + i + " Is NaN. Updating " + newAttribute + i + " with 0")
                    setAttrs(update, {silent: true});
                }
                else {
                    update[newAttribute + i] = 1;
                    console.log(oldAttribute + i + " Is aN. Updating " + newAttribute + i + " with 1")
                    setAttrs(update, {silent: true});
                }
            }
        });
    }

    var update_repeating = function(oldRepeating, newRepeating, oldField1, newField1, oldField2, newField2) {
        console.log("Updating repeating from: " + oldRepeating + " to: " + newRepeating);

        getSectionIDs(oldRepeating, function(idArray) {
            if(!oldField2) {
                var update={};
                _.each(idArray, function(currentID) {
                    getAttrs([oldRepeating + "_" + currentID + "_" + oldField1], function(v) {
                        if(v[oldRepeating + "_" + currentID + "_" + oldField1]) {
                            var newrowid = generateRowID();
                            update[newRepeating + "_" + newrowid + "_" + newField1] = v[oldRepeating + "_" + currentID + "_" + oldField1];
                            setAttrs(update);
                        }
                    });
                });
            }

            if(oldField2) {
                var update={};
                _.each(idArray, function(currentID) {
                    getAttrs([oldRepeating + "_" + currentID + "_" + oldField1, oldRepeating + "_" + currentID + "_" + oldField2], function(v) {
                        if(v[oldRepeating + "_" + currentID + "_" + oldField1]) {
                            var newrowid = generateRowID();
                            update[newRepeating + "_" + newrowid + "_" + newField1] = v[oldRepeating + "_" + currentID + "_" + oldField1];
                            setAttrs(update);

                            if(v[oldRepeating + "_" + currentID + "_" + oldField2]) {
                                update[newRepeating + "_" + newrowid + "_" + newField2] = v[oldRepeating + "_" + currentID + "_" + oldField2];
                                setAttrs(update);
                            }
                        }
                    });
                });
            }
        });
    }

    //relationship, buddy
    var update_relationships = function() {
        console.log("Updating repeating from: repeating_relations to: repeating_relationships");
        getSectionIDs("repeating_relations", function(idarray) {
            var update={};
            _.each(idarray, function(currentID) {
                getAttrs(["repeating_relations" + "_" + currentID + "_" + "relation", "repeating_relations" + "_" + currentID + "_" + "narstaende"], function(v) {
                    var newrowid = generateRowID();
                    if(v["repeating_relations" + "_" + currentID + "_" + "relation"]) {
                        update["repeating_relationships" + "_" + newrowid + "_" + "relationship_pc"] = v["repeating_relations" + "_" + currentID + "_" + "relation"];
                        setAttrs(update);

                        if(v["repeating_relations" + "_" + currentID + "_" + "narstaende"]) {
                            update["repeating_relationships" + "_" + newrowid + "_" + "buddy"] = 1;
                            setAttrs(update, {silent: true});
                        }
                    }
                });
            });
        });
    }

    //weapon, weapon_bonus, weapon_init, weapon_damage, weapon_crit, weapon_range, weapon_comments
    var update_weapons = function() {
        console.log("Updating repeating from: repeating_vapen to: repeating_weapon");
        getSectionIDs("repeating_vapen", function(idarray) {
            var update={};
            _.each(idarray, function(currentID) {
                getAttrs(["repeating_vapen" + "_" + currentID + "_" + "vapen", "repeating_vapen" + "_" + currentID + "_" + "vapen_bonus", "repeating_vapen" + "_" + currentID + "_" + "vapen_init", "repeating_vapen" + "_" + currentID + "_" + "vapen_skada", "repeating_vapen" + "_" + currentID + "_" + "vapen_krit", "repeating_vapen" + "_" + currentID + "_" + "vapen_rackvidd", "repeating_vapen" + "_" + currentID + "_" + "vapen_ovrigt", "repeating_vapen" + "_" + currentID + "_" + "reload1", "repeating_vapen" + "_" + currentID + "_" + "reload2", "repeating_vapen" + "_" + currentID + "_" + "reload3", "repeating_vapen" + "_" + currentID + "_" + "reload4", "repeating_vapen" + "_" + currentID + "_" + "reload5", "repeating_vapen" + "_" + currentID + "_" + "reload6"], function(v) {
                    var newrowid = generateRowID();
                    if(v["repeating_vapen" + "_" + currentID + "_" + "vapen"]) {
                        update["repeating_weapon" + "_" + newrowid + "_" + "weapon"] = v["repeating_vapen" + "_" + currentID + "_" + "vapen"];
                        setAttrs(update);
                        update["repeating_weapon" + "_" + newrowid + "_" + "weapon_bonus"] = v["repeating_vapen" + "_" + currentID + "_" + "vapen_bonus"];
                        setAttrs(update);
                        update["repeating_weapon" + "_" + newrowid + "_" + "weapon_init"] = v["repeating_vapen" + "_" + currentID + "_" + "vapen_init"];
                        setAttrs(update);
                        update["repeating_weapon" + "_" + newrowid + "_" + "weapon_damage"] = v["repeating_vapen" + "_" + currentID + "_" + "vapen_skada"];
                        setAttrs(update);
                        update["repeating_weapon" + "_" + newrowid + "_" + "weapon_crit"] = v["repeating_vapen" + "_" + currentID + "_" + "vapen_krit"];
                        setAttrs(update);
                        update["repeating_weapon" + "_" + newrowid + "_" + "weapon_range"] = v["repeating_vapen" + "_" + currentID + "_" + "vapen_rackvidd"];
                        setAttrs(update);
                        update["repeating_weapon" + "_" + newrowid + "_" + "weapon_comments"] = v["repeating_vapen" + "_" + currentID + "_" + "vapen_ovrigt"];
                        setAttrs(update);

                        for(var i = 1; i <= 6; i++) {
                            if( isNaN(parseInt(v["repeating_vapen" + "_" + currentID + "_" + "reload" + i],10)) ) {
                                update["repeating_weapon" + "_" + newrowid + "_" + "reload" + i] = 0;
                                setAttrs(update, {silent: true});
                            }
                            else {
                                update["repeating_weapon" + "_" + newrowid + "_" + "reload" + i] = 1;
                                setAttrs(update, {silent: true});
                            }
                        }
                    }
                });
            });
        });
    }

    //spaceship_module
    var update_spaceship_module = function() {
        console.log("Updating repeating from: repeating_skeppsmoduler to: repeating_spaceship-modules");
        getSectionIDs("repeating_skeppsmoduler", function(idarray) {
            var update={};
            _.each(idarray, function(currentID) {
                getAttrs(["repeating_skeppsmoduler" + "_" + currentID + "_" + "skeppsmodul", "repeating_skeppsmoduler" + "_" + currentID + "_" + "utslagen"], function(v) {
                    var newrowid = generateRowID();
                    if(v["repeating_skeppsmoduler" + "_" + currentID + "_" + "skeppsmodul"]) {
                        update["repeating_spaceship-modules" + "_" + newrowid + "_" + "spaceship-module"] = v["repeating_skeppsmoduler" + "_" + currentID + "_" + "skeppsmodul"];
                        setAttrs(update);

                        if( isNaN(parseInt(v["repeating_skeppsmoduler" + "_" + currentID + "_" + "utslagen"],10)) ) {
                            update["repeating_spaceship-modules" + "_" + newrowid + "_" + "disabled"] = 0;
                            setAttrs(update, {silent: true});
                        }
                        else if(parseInt(v["repeating_skeppsmoduler" + "_" + currentID + "_" + "utslagen"],10) === 0) { // Checking for 0, since original sheet set this value to 0 if checked
                            update["repeating_spaceship-modules" + "_" + newrowid + "_" + "disabled"] = 1;
                            setAttrs(update, {silent: true});
                        }
                    }
                });
            });
        });
    }

    //spaceship-weaponsystem, spaceship-weaponsystem-bonus, spaceship-weaponsystem-damage, spaceship-weaponsystem-crit, spaceship-weaponsystem-range, spaceship-weaponsystem-comments
    var update_spaceship_weaponsystem = function() {
    console.log("Updating repeating from: repeating_skepp-vapen to: repeating_spaceship-weapons");
    getSectionIDs("repeating_skepp-vapen", function(idarray) {
            var update={};
            _.each(idarray, function(currentID) {
                getAttrs(["repeating_skepp-vapen" + "_" + currentID + "_" + "skepp-vapensystem", "repeating_skepp-vapen" + "_" + currentID + "_" + "skepp-vapensystem-bonus", "repeating_skepp-vapen" + "_" + currentID + "_" + "skepp-vapensystem-r&auml;ckvidd", "repeating_skepp-vapen" + "_" + currentID + "_" + "skepp-vapensystem-skada", "repeating_skepp-vapen" + "_" + currentID + "_" + "skepp-vapensystem-krit", "repeating_skepp-vapen" + "_" + currentID + "_" + "skepp-vapensystem-ovrigt"], function(v) {
                    var newrowid = generateRowID();
                    if(v["repeating_skepp-vapen" + "_" + currentID + "_" + "skepp-vapensystem"]) {
                            update["repeating_spaceship-weapons" + "_" + newrowid + "_" + "spaceship-weaponsystem"] = v["repeating_skepp-vapen" + "_" + currentID + "_" + "skepp-vapensystem"];
                            setAttrs(update);
                        if(v["repeating_skepp-vapen" + "_" + currentID + "_" + "skepp-vapensystem-bonus"]) {
                            update["repeating_spaceship-weapons" + "_" + newrowid + "_" + "spaceship-weaponsystem-bonus"] = v["repeating_skepp-vapen" + "_" + currentID + "_" + "skepp-vapensystem-bonus"];
                            setAttrs(update);
                        }
                        if(v["repeating_skepp-vapen" + "_" + currentID + "_" + "skepp-vapensystem-skada"]) {
                            update["repeating_spaceship-weapons" + "_" + newrowid + "_" + "spaceship-weaponsystem-damage"] = v["repeating_skepp-vapen" + "_" + currentID + "_" + "skepp-vapensystem-skada"];
                            setAttrs(update);
                        }
                        if(v["repeating_skepp-vapen" + "_" + currentID + "_" + "skepp-vapensystem-krit"]) {
                            update["repeating_spaceship-weapons" + "_" + newrowid + "_" + "spaceship-weaponsystem-crit"] = v["repeating_skepp-vapen" + "_" + currentID + "_" + "skepp-vapensystem-krit"];
                            setAttrs(update);
                        }
                        if(v["repeating_skepp-vapen" + "_" + currentID + "_" + "skepp-vapensystem-r&auml;ckvidd"]) {
                            update["repeating_spaceship-weapons" + "_" + newrowid + "_" + "spaceship-weaponsystem-range"] = v["repeating_skepp-vapen" + "_" + currentID + "_" + "skepp-vapensystem-r&auml;ckvidd"];
                            setAttrs(update);
                        }
                        if(v["repeating_skepp-vapen" + "_" + currentID + "_" + "skepp-vapensystem-ovrigt"]) {
                            update["repeating_spaceship-weapons" + "_" + newrowid + "_" + "spaceship-weaponsystem-comments"] = v["repeating_skepp-vapen" + "_" + currentID + "_" + "skepp-vapensystem-ovrigt"];
                            setAttrs(update);
                        }
                    }
                });
            });
        });
    }

    var update_hitpoints = function(par_Strength, par_Agility) {
        console.log("Updating hitpoints");
            getAttrs([par_Strength, par_Agility], function(v) {
                setAttrs({
                    "hitpoints": parseInt(v[par_Strength],10) + parseInt(v[par_Agility],10)
                });
            });
    }

    var update_mindpoints = function(par_Wits, par_Empathy) {
        console.log("Updating mindpoints");
            getAttrs([par_Wits, par_Empathy], function(v) {
                setAttrs({
                    "mindpoints": parseInt(v[par_Wits],10) + parseInt(v[par_Empathy],10)
                });
            });
    }

    var update_carryMAX = function(par_Strength) {
        console.log("Updating carryMAX");
            getAttrs([par_Strength], function(v) {
                setAttrs({
                    "carry-max": parseInt((v[par_Strength]*2),10)
                });
            });
    }

