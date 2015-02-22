var app = angular.module("MyFirstApp",[]);

app.controller("FirstController",["$scope","$http",function(m,h){
	m.nombre = "Uriel";
	m.nuevoComentario = {};
	m.comentarios = [
		{
			comentario: "Buen tutorial",
			username: "Marcos"
		},
		{
			comentario: "Buen tutorial",
			username: "Otro usuario"
		}
	];

	m.agregarComentario = function(){
		m.comentarios.push(m.nuevoComentario);
		m.nuevoComentario = {};
	}
}])