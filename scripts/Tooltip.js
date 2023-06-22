export const toolTipRender = () => {
    let html = `
    <img id="tooltip-img" class="image" src="images/help.png">
    <p id="tooltip-text"><span id="tooltip-heading">MINEWARS - HOW TO PLAY:</span><br><br>

    Lead your colonies and defend against the onslaught of the space pirate hoard!<br><br>

    Choose a governor and a facility. You can switch these at anytime. Once you have made your selections, you may obtain minerals from the facility for your colony. A turn will pass everytime you purchase minerals.<br><br>
    
    Minerals are the lifeblood of colonies and facilities! They keep your colonies and facilities running and can be used to purchase sercurity. Minerals are consumed by each colony for every turn that passes. Additionally, facilities produce more minerals every turn.<br><br>

    Beware! The space pirates won't stop until they have stolen all of your minerals. Every 3 turns, the pirate captain recruits more raiders to further their conquest. Once raiders have been recruited, raids will begin!<br><br>

    Raids will happen at random and will occur at random colonies and facilities. If you have more security at your location than there are raiders, you will successfully defend the location and protect your minerals, but you will lose security forces. The pirates will also lose some of their raiders, though!<br><br>

    If a raid is successful, the attacked colony or facility will loose a random amount of minerals. Additionally, if a colony is attacked, there is a chance one of its governors will be killed! If this happens, make sure to recruit a new one!<br><br>

    God speed and good luck, leader!</div>`

    return html
}
