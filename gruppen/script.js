function setupGroupNames() {
    const groupCount = parseInt(document.getElementById("groupCount").value);
    const groupNamesContainer = document.getElementById("groupNames");

    // Clear previous group name inputs
    groupNamesContainer.innerHTML = "";

    if (isNaN(groupCount) || groupCount < 2) {
        alert("Bitte geben Sie eine gültige Anzahl von Gruppen (größer als 1) ein.");
        return;
    }

    // Create input fields for group names
    for (let i = 0; i < groupCount; i++) {
        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = `Gruppenname ${i + 1}`;
        input.classList.add("group-name-input");
        groupNamesContainer.appendChild(input);
    }

    // Show the "Create Groups" button
    document.getElementById("createGroupsButton").style.display = "block";
	document.querySelector('.group-names-container').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function createGroups() {
    const names = document.getElementById("names").value.split(/\r?\n/).map(name => name.trim()).filter(name => name !== "");
    const groupCount = parseInt(document.getElementById("groupCount").value);
    const resultContainer = document.getElementById("result");

    // Clear previous results
    resultContainer.innerHTML = "";

    if (names.length === 0 || isNaN(groupCount) || groupCount < 2) {
        alert("Bitte geben Sie gültige Namen und eine Gruppenanzahl größer als 1 ein.");
        return;
    }

    const groupNames = Array.from(document.getElementsByClassName("group-name-input")).map(input => input.value || `Gruppe ${input.placeholder.split(" ")[1]}`);

    // Shuffle names
    for (let i = names.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [names[i], names[j]] = [names[j], names[i]];
    }

    // Distribute names into groups as evenly as possible
    const groups = Array.from({ length: groupCount }, () => []);

    names.forEach((name, index) => {
        groups[index % groupCount].push(name);
    });

    // Display groups with animation
    groups.forEach((group, index) => {
        const groupDiv = document.createElement("div");
        groupDiv.classList.add("group");

        const groupNameDiv = document.createElement("div");
        groupNameDiv.classList.add("group-name");
        groupNameDiv.textContent = groupNames[index];
        groupDiv.appendChild(groupNameDiv);

        resultContainer.appendChild(groupDiv);

        group.forEach((name, nameIndex) => {
            const nameDiv = document.createElement("div");
            nameDiv.textContent = name;
            nameDiv.classList.add("name");
            nameDiv.style.animationDelay = `${nameIndex * 0.1}s`;
            setTimeout(() => {
                groupDiv.appendChild(nameDiv);
            }, nameIndex * 500); // Delay each name by 500ms
        });
    });

    // Scroll to result container

	document.body.style.height = "3000px"; // Temporär verlängern
    document.querySelector('.result-container').scrollIntoView({ behavior: 'smooth', block: 'start'});
	setTimeout(function() {
                document.body.style.height = originalHeight; // Wiederherstellen
            }, 1000); // Warte, bis das Scrollen abgeschlossen ist
}