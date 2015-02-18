Template.roomPage.events({
// Récupère les donnees de la salle puis l'affiche
"click .creer" : function(e) {
	var positions = Session.get("positions");
	var nbRow = Session.get("roomRow");
	var nbCol = Session.get("roomCol");
	createTableRoom(nbRow, nbCol, positions);
},
// Modifie suite a un click le statut seatactivity d'une place : active or inactive	
"click .cel" : function(e) {
	var idSchool = this._id;
	var nomSalle = Session.get("roomName");
	var seatPosition = $(e.target).attr("data-numeroplace");
	if($(e.target).attr("data-seatactivity") == "active"){
		$(e.target).attr("data-seatactivity", "inactive");
		Meteor.call("supprimerSeat", idSchool, nomSalle, seatPosition);
	} else{
		$(e.target).attr("data-seatactivity", "active");
		Meteor.call("ajouterSeat", idSchool, nomSalle, seatPosition);
	};
}
});

// Créer un tableau d'après nombre de lignes, nombre de colonnes et positions occupees
function createTableRoom (nbRow, nbCol, positions) {
	supprimerTableau('.tableSeat');
	var table = $('<table></table>').addClass('tableSeat');
	for (var i = 1; i <= nbRow; i++) {
		var numeroLigne = nbRow - i +1;
		var ligne = $('<tr></tr>').addClass(numeroLigne.toString());
		table.append(ligne);
		for (var j = 1; j <= nbCol; j++) {
			var seat = (numeroLigne * 10) + j;
			var cel = $('<td></td>').addClass('cel' + seat.toString());
			var divCel = $('<div/>', {"class" : 'cel' });
			divCel.attr("data-numeroplace",seat);
			if (dansList(seat, positions)) {
				divCel.attr("data-seatactivity","active");
			} else {
				divCel.attr("data-seatactivity","inactive");
			}
			cel.append(divCel);
			ligne.append(cel);
		}
	}
	$("#zoneTable").append(table);
}

//Supprime le plan de classe
function supprimerTableau(classeTab) {
	if ($(classeTab).length > 0) {
		$(classeTab).remove();
	}
}

// Verifie l'existence d'une valeur dans un tableau
function dansList(valeur, tableau){
	if(jQuery.inArray(valeur, tableau) != -1){
		return true;
	}
	else {
		return false;
	}
}