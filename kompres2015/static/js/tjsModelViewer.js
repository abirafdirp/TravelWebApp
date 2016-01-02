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
					var scene, camera, renderer;

					var WIDTH  = window.innerWidth;
					var HEIGHT = window.innerHeight;

					var SPEED = 0.01;

					function init() {
						scene = new THREE.Scene();

						scene.fog = new THREE.Fog( 0xffffff, 1, 5000 );
						scene.fog.color.setHSL( 0.6, 0, 1 );

						initMesh();
						initCamera();
						initLights();
						initRenderer();
					}

					function initCamera() {
						camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, 1, 10);
						camera.position.set(5, 1, 5);
						//camera.lookAt(scene.position);
						//camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
						//camera.position.z = 500;
					}

					function initRenderer() {
						renderer = new THREE.WebGLRenderer({ antialias: true });
						renderer.setSize(window.innerWidth, window.innerHeight);
						elem[0].appendChild(renderer.domElement);

						controls = new THREE.OrbitControls( camera, renderer.domElement );

						controls.rotateSpeed = 0.2;
						controls.zoomSpeed = 1.2;
						controls.panSpeed = 0.8;

						controls.enablePan = false;

						controls.enableDamping = true;
						controls.DampingFactor = 0.3;

						controls.keys = [ 65, 83, 68 ];

						//controls.addEventListener( 'change', render );

						// Events
						window.addEventListener('resize', onWindowResize, false);
					}

					function onWindowResize(event) {
						renderer.setSize(window.innerWidth, window.innerHeight);
						camera.aspect = window.innerWidth / window.innerHeight;
						camera.updateProjectionMatrix();
						controls.handleResize();
					}

					function initLights() {
						hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
						hemiLight.color.setHSL( 0.6, 1, 0.6 );
						hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
						hemiLight.position.set( 0, 500, 0 );
						scene.add( hemiLight );

						dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
						dirLight.color.setHSL( 0.1, 1, 0.95 );
						dirLight.position.set( -1, 1.75, 1 );
						dirLight.position.multiplyScalar( 50 );
						scene.add( dirLight );

						dirLight.castShadow = true;

						dirLight.shadowMapWidth = 2048;
						dirLight.shadowMapHeight = 2048;

						var d = 50;

						dirLight.shadowCameraLeft = -d;
						dirLight.shadowCameraRight = d;
						dirLight.shadowCameraTop = d;
						dirLight.shadowCameraBottom = -d;

						dirLight.shadowCameraFar = 3500;
						dirLight.shadowBias = -0.0001;
						//dirLight.shadowCameraVisible = true;

						// GROUND

						var groundGeo = new THREE.PlaneBufferGeometry( 10000, 10000 );
						var groundMat = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0x050505 } );
						groundMat.color.setHSL( 0.095, 1, 0.75 );

						var ground = new THREE.Mesh( groundGeo, groundMat );
						ground.rotation.x = -Math.PI/2;
						ground.position.y = -33;
						scene.add( ground );

						ground.receiveShadow = true;

					}

					var mesh = null;
					function initMesh() {
						var loader = new THREE.JSONLoader();
						loader.load('partials/models/monumen%20nasional/', function(geometry, materials) {
							mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
							mesh.scale.x = mesh.scale.y = mesh.scale.z = 0.2;
							mesh.translation = THREE.GeometryUtils.center(geometry);
							scene.add(mesh);
						});
					}

					function rotateMesh() {
						if (!mesh) {
							return;
						}

						mesh.rotation.x -= SPEED * 2;
						mesh.rotation.y -= SPEED;
						mesh.rotation.z -= SPEED * 3;
					}

					function render() {
						requestAnimationFrame(render);
						//rotateMesh();
						renderer.render(scene, camera);
					}

					init();
					render();
				}
			}
		}
		]);