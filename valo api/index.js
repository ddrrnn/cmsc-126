async function fetchData() {
    try {
        const agentName = document.getElementById("agentName").value.toLowerCase();
        const response = await fetch(`https://valorant-api.com/v1/agents?isPlayableCharacter=true`);
        
        if (!response.ok) {
            throw new Error("error in fetching agent data");
        }

        const agentData = await response.json();
        const agents = agentData.data;

        const agent = agents.find(agent => agent.displayName.toLowerCase() === agentName);
        if (!agent) {
            alert("Agent not found.");
            throw new Error("agent not found");
        }

        const agentID = agent.uuid;
        const agentResponse = await fetch(`https://valorant-api.com/v1/agents/${agentID}`);
        if (!agentResponse.ok) {
            throw new Error("error in fetching data");
        }

        const data = await agentResponse.json();
        const agentSprite = data.data.fullPortrait; 
        const imgElement = document.getElementById("agentSprite");
        imgElement.src = agentSprite;

        const agentBg = data.data.background;
        const bgElement = document.getElementById("agentBg");
        bgElement.src = agentBg;
        
        const agentNameDisplay = data.data.displayName;
        const nameDisplay = document.getElementById("agentNameDisplay");
        nameDisplay.textContent = agentNameDisplay;

        const agentRole = data.data.role.displayName;
        const roleDisplay = document.getElementById("agentRole");
        roleDisplay.textContent = " " + agentRole;

        const agentRoleDescription = data.data.role.description;
        const roleDesc = document.getElementById("agentRoleDetail");
        roleDesc.textContent = agentRoleDescription;

        const roleIcon = data.data.role.displayIcon;
        const roleIconHolder =  document.getElementById("roleImg");
        roleIconHolder.src = roleIcon;

        const abilitiesContainer = document.getElementById("agentAbilities");
        abilitiesContainer.innerHTML = "";
        data.data.abilities.forEach(ability => {
            const abilityItem = document.createElement("p");
            abilityItem.innerHTML = `<b>${ability.displayName}</b>: ${ability.description}`;
            abilitiesContainer.appendChild(abilityItem);
            
            const abilityIcon = document.createElement("img");
            abilityIcon.src = ability.displayIcon;
            abilityIcon.style.width = "25px"; 
            abilityIcon.style.height = "25px"; 
            abilitiesContainer.appendChild(abilityIcon);
        
        });

        const agentInfo= document.getElementById("agentInfo");
        agentInfo.style.display = "block";

    }
    
    catch(error) {
        console.error(error);
    }
}
