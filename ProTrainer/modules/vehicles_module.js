/// <reference path="../../.config/sa.d.ts" />

export class VehicleMenu {
    constructor() {
        this.menuDef = {
            name: "Véhicules Spawner",
            subMenu: {
                title: "CATÉGORIES",
                items: []
            }
        };
        this.buildMenu();
    }

    getMenu() {
        return this.menuDef;
    }

    buildMenu() {
        for (let i = 0; i < categories.length; i++) {
            let categoryName = categories[i];
            let categoryItems = [];
            
            let vehiclesList = vehicleDb[categoryName];

            if (vehiclesList) {
                for (let j = 0; j < vehiclesList.length; j++) {
                    let v = vehiclesList[j];
                    categoryItems.push({
                        name: v.name,
                        action: () => spawnVehicle(v.id)
                    });
                }

                this.menuDef.subMenu.items.push({
                    name: categoryName,
                    subMenu: {
                        title: categoryName.toUpperCase(),
                        items: categoryItems
                    }
                });
            }
        }
    }
}

// 1. La liste des cat�gories
export const categories = [
    "Airplanes",
    "Helicopters",
    "Boats",
    "Motos",
    "2-Door & Compact cars",
    "4-Door & Luxury cars",
    "Civil service",
    "Government vehicles",
    "Heavy & Utility trucks",
    "Light trucks & Vans",
    "SUVs & Wagons",
    "Lowriders & Classics",
    "Muscle cars",
    "Street racers",
    "RC Vehicles",
    "Trailers",
    "Trains & Railroad cars",
    "Recreational"
];

// 2. Le dictionnaire des v�hicules par cat�gorie (GTA SA DE)
export const vehicleDb = {
    "Airplanes": [
        { name: "Andromada", id: 592 },
        { name: "AT-400", id: 577 },
        { name: "Beagle", id: 511 },
        { name: "Cropduster", id: 512 },
        { name: "Dodo", id: 593 },
        { name: "Hydra", id: 520 },
        { name: "Nevada", id: 553 },
        { name: "Rustler", id: 476 },
        { name: "Shamal", id: 519 },
        { name: "Skimmer", id: 460 },
        { name: "Stuntplane", id: 513 }
    ],
    "Helicopters": [
        { name: "Cargobob", id: 548 },
        { name: "Hunter", id: 425 },
        { name: "Leviathan", id: 417 },
        { name: "Maverick", id: 487 },
        { name: "News Chopper", id: 488 },
        { name: "Police Maverick", id: 497 },
        { name: "Raindance", id: 563 },
        { name: "Seasparrow", id: 447 },
        { name: "Sparrow", id: 469 }
    ],
    "Boats": [
        { name: "Coastguard", id: 472 },
        { name: "Dinghy", id: 473 },
        { name: "Jetmax", id: 493 },
        { name: "Launch", id: 595 },
        { name: "Marquis", id: 484 },
        { name: "Predator", id: 430 },
        { name: "Reefer", id: 453 },
        { name: "Speeder", id: 452 },
        { name: "Squalo", id: 446 },
        { name: "Tropic", id: 454 }
    ],
    "Motos": [
        { name: "BF-400", id: 581 },
        { name: "Bike", id: 509 },
        { name: "BMX", id: 481 },
        { name: "Faggio", id: 462 },
        { name: "FCR-900", id: 521 },
        { name: "Freeway", id: 463 },
        { name: "Mountain Bike", id: 510 },
        { name: "NRG-500", id: 522 },
        { name: "PCJ-600", id: 461 },
        { name: "Pizzaboy", id: 448 },
        { name: "Sanchez", id: 468 },
        { name: "Wayfarer", id: 586 }
    ],
    "2-Door & Compact cars" : [
        { name: "Alpha", id: 602 },
        { name: "Blista Compact", id: 496 },
        { name: "Bravura", id: 401 },
        { name: "Buccaneer", id: 518 },
        { name: "Cadrona", id: 527 },
        { name: "Club", id: 589 },
        { name: "Esperanto", id: 419 },
        { name: "Euros", id: 587 },
        { name: "Feltzer", id: 533 },
        { name: "Fortune", id: 526 },
        { name: "Hermes", id: 474 },
        { name: "Hustler", id: 545 },
        { name: "Majestic", id: 517 },
        { name: "Manana", id: 410 },
        { name: "Picador", id: 600 },
        { name: "Previon", id: 436 },
        { name: "Stallion", id: 439 },
        { name: "Tampa", id: 549 },
        { name: "Virgo", id: 491 }
    ],
    "4-Door & Luxury cars": [
        { name: "Admiral", id: 445 },
        { name: "Glendale Damaged", id: 604 },
        { name: "Elegant", id: 507 },
        { name: "Emperor", id: 585 },
        { name: "Glendale", id: 466 },
        { name: "Greenwood", id: 492 },
        { name: "Intruder", id: 546 },
        { name: "Merit", id: 551 },
        { name: "Nebula", id: 516 },
        { name: "Oceanic", id: 467 },
        { name: "Premier", id: 426 },
        { name: "Primo", id: 547 },
        { name: "Sentinel", id: 405 },
        { name: "Stafford", id: 580 },
        { name: "Stretch", id: 409 },
        { name: "Sunrise", id: 550 },
        { name: "Tahoma", id: 566 },
        { name: "Vincent", id: 540 },
        { name: "Washington", id: 421 },
        { name: "Willard", id: 529 }
    ],
    "Civil service" : [
        { name: "Baggage", id: 485 },
        { name: "Bus", id: 431 },
        { name: "Cabbie", id: 438 },
        { name: "Coach", id: 437 },
        { name: "Sweeper", id: 574 },
        { name: "Taxi", id: 420 },
        { name: "Towtruck", id: 525 },
        { name: "Trashmaster", id: 408 },
        { name: "Utility Van", id: 552 }
    ],
    "Government vehicles" : [
        { name: "Ambulance", id: 416 },
        { name: "Barracks", id: 433 },
        { name: "Enforcer", id: 427 },
        { name: "FBI Rancher", id: 490 },
        { name: "FBI Truck", id: 528 },
        { name: "Fire Truck", id: 407 },
        { name: "Fire Truck Ladder", id: 544 },
        { name: "HPV1000", id: 523 },
        { name: "Patriot", id: 470 },
        { name: "Police LS", id: 596 },
        { name: "Police LV", id: 598 },
        { name: "Police Ranger", id: 599 },
        { name: "Police SF", id: 597 },
        { name: "Rhino", id: 432 },
        { name: "S.W.A.T.", id: 601 },
        { name: "Securicar", id: 428 }
    ],
    "Heavy & Utility trucks" : [
        { name: "Benson", id: 499 },
        { name: "Boxville Mission", id: 609 },
        { name: "Boxville", id: 498 },
        { name: "Cement Truck", id: 524 },
        { name: "Combine Harvester", id: 532 },
        { name: "DFT-30", id: 578 },
        { name: "Dozer", id: 486 },
        { name: "Dumper", id: 406 },
        { name: "Dune", id: 573 },
        { name: "Flatbed", id: 455 },
        { name: "Hotdog", id: 588 },
        { name: "Linerunner", id: 403 },
        { name: "Mr. Whoopee", id: 423 },
        { name: "Mule", id: 414 },
        { name: "Packer", id: 443 },
        { name: "Roadtrain", id: 515 },
        { name: "Tanker", id: 514 },
        { name: "Tractor", id: 531 },
        { name: "Yankee", id: 456 }
    ],
    "Light trucks & Vans" : [
        { name: "Berkley's RC Van", id: 459 },
        { name: "Bobcat", id: 422 },
        { name: "Burrito", id: 482 },
        { name: "Forklift", id: 530 },
        { name: "Moonbeam", id: 418 },
        { name: "Mower", id: 572 },
        { name: "Newsvan", id: 582 },
        { name: "Pony", id: 413 },
        { name: "Rumpo", id: 440 },
        { name: "Sadler", id: 543 },
        { name: "Sadler Damaged", id: 605 },
        { name: "Tug", id: 583 },
        { name: "Walton", id: 478 },
        { name: "Yosemite", id: 554 }
    ],
    "SUVs & Wagons" : [
        { name: "Huntley", id: 579 },
        { name: "Landstalker", id: 400 },
        { name: "Perennial", id: 404 },
        { name: "Rancher", id: 489 },
        { name: "Rancher Lure", id: 505 },
        { name: "Regina", id: 479 },
        { name: "Romero", id: 442 },
        { name: "Solair", id: 458 }
    ],
    "Lowriders & Classics" : [
        { name: "Blade", id: 536 },
        { name: "Broadway", id: 575 },
        { name: "Remington", id: 534 },
        { name: "Savanna", id: 567 },
        { name: "Slamvan", id: 535 },
        { name: "Tornado", id: 576 },
        { name: "Voodoo", id: 412 }
    ],
    "Muscle cars" : [
        { name: "Buffalo", id: 402 },
        { name: "Clover", id: 542 },
        { name: "Phoenix", id: 603 },
        { name: "Sabre", id: 475 }
    ],
    "Street racers": [
        { name: "Banshee", id: 429 },
        { name: "Bullet", id: 541 },
        { name: "Cheetah", id: 415 },
        { name: "Comet", id: 480 },
        { name: "Elegy", id: 562 },
        { name: "Flash", id: 565 },
        { name: "Hotring Racer", id: 434 },
        { name: "Hotring Racer 2", id: 503 },
        { name: "Hotring Racer 3", id: 502 },
        { name: "Infernus", id: 411 },
        { name: "Jester", id: 559 },
        { name: "Stratum", id: 561 },
        { name: "Sultan", id: 560 },
        { name: "Super GT", id: 506 },
        { name: "Turismo", id: 451 },
        { name: "Uranus", id: 558 },
        { name: "Windsor", id: 555 },
        { name: "ZR-350", id: 477 }
    ],
    "RC Vehicles": [
        { name: "RC Bandit", id: 441 },
        { name: "RC Baron", id: 464 },
        { name: "RC Cam", id: 594 },
        { name: "RC Goblin", id: 501 },
        { name: "RC Raider", id: 465 },
        { name: "RC Tiger", id: 564 }
    ],
    "Trailers" : [
        { name: "Baggage Trailer (covered)", id: 606 },
        { name: "Baggage Trailer (Uncovered)", id: 607 },
        { name: "Farm Trailer", id: 610 },
        { name: "Street Clean Trailer", id: 611 },
        { name: "Trailer (Stairs)", id: 608 },
        { name: "Trailer (Tanker Commando)", id: 584 },
        { name: "Trailer 1", id: 435 },
        { name: "Trailer 2", id: 450 },
        { name: "Trailer 3", id: 591 }
    ],
    "Trains & Railroad cars" : [
        { name: "Box Freight", id: 590 },
        { name: "Freight", id: 537 },
        { name: "Freight Train Flatbed", id: 569 },
        { name: "Streak", id: 538 },
        { name: "Streak Train Trailer", id: 570 },
        { name: "Tram", id: 449 }
    ],
    "Recreational" : [
        { name: "Bandito", id: 568 },
        { name: "BF Injection", id: 424 },
        { name: "Bloodring Banger", id: 504 },
        { name: "Caddy", id: 457 },
        { name: "Camper", id: 483 },
        { name: "Journey", id: 508 },
        { name: "Kart", id: 571 },
        { name: "Mesa", id: 500 },
        { name: "Monster", id: 444 },
        { name: "Monster 2", id: 556 },
        { name: "Monster 3", id: 557 },
        { name: "Quadbike", id: 471 },
        { name: "Sandking", id: 495 },
        { name: "Vortex", id: 539 }
    ]
};

// 3. La fonction magique pour faire apparaitre le véhicule
export async function spawnVehicle(modelId) {
    Streaming.RequestModel(modelId);
    while (!Streaming.HasModelLoaded(modelId)) {
        await asyncWait(0);
    }

    let p = new Player(0).getChar();
    let pos = p.getCoordinates();
    let heading = p.getHeading();
    let rad = heading * Math.PI / 180;

    pos.x -= Math.sin(rad) * 5.0;
    pos.y += Math.cos(rad) * 5.0;
    pos.z += 1.0;

    let car = Car.Create(modelId, pos.x, pos.y, pos.z);
    car.setHeading(heading);
    car.markAsNoLongerNeeded();

    Streaming.MarkModelAsNoLongerNeeded(modelId);
}