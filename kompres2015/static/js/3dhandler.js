angular.module("tjsModelViewer", [])
		.directive(
		"tjsModelViewer",
		[function () {
			return {
				restrict: "E",
				scope: {
					assimpUrl: "=assimpUrl"
				},
				link: function (scope, elem, attr) {
					var camera;
					var scene;
					var renderer;
					var previous;

					init();

					var loader = new THREE.JSONLoader();

					scope.$watch("modelUrl", function(newValue, oldValue) {
						if (newValue != oldValue) loadModel(newValue);
					});

					function loadModel(modelUrl) {
						loader.load(modelUrl, function(geometry) {
							mesh = new THREE.Mesh(geometry);
							if (previous) scene.remove(previous);
							previous = mesh;
							mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
							mesh.scale.x = mesh.scale.y = mesh.scale.z = 0.75;
							mesh.translation = THREE.GeometryUtils.center(geometry);
							scene.add(mesh);
						});
					}

					function init() {
						camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 2000);
						camera.position.set(2, 4, 5);
						scene = new THREE.Scene();
						scene.fog = new THREE.FogExp2(0x000000, 0.035);
						// Lights
						scene.add(new THREE.AmbientLight(0xcccccc));
						var directionalLight = new THREE.DirectionalLight(/*Math.random() * 0xffffff*/0xeeeeee);
						directionalLight.position.x = Math.random() - 0.5;
						directionalLight.position.y = Math.random() - 0.5;
						directionalLight.position.z = Math.random() - 0.5;
						directionalLight.position.normalize();
						scene.add(directionalLight);

						// Renderer
						renderer = new THREE.WebGLRenderer();
						renderer.setSize(window.innerWidth, window.innerHeight);
						elem[0].appendChild(renderer.domElement);

						// Events
						window.addEventListener('resize', onWindowResize, false);
					}

					//
					function onWindowResize(event) {
						renderer.setSize(window.innerWidth, window.innerHeight);
						camera.aspect = window.innerWidth / window.innerHeight;
						camera.updateProjectionMatrix();
					}

					//
					var t = 0;

					//
					function render() {
						var timer = Date.now() * 0.0005;
						camera.position.x = Math.cos(timer) * 10;
						camera.position.y = 4;
						camera.position.z = Math.sin(timer) * 10;
						camera.lookAt(scene.position);
						renderer.render(scene, camera);
					}
				}
			}
		}
		]);