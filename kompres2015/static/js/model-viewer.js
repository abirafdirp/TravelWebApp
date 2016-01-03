angular.module("3d-handler", [])
		.directive(
		"modelViewer",
		[function () {
			return {
				restrict: "E",
				scope: {
					model_url: "=modelUrl"
				},
				link: function (scope, elem, attr) {
					var scene, camera, renderer;

					var WIDTH  = window.innerWidth;
					var HEIGHT = window.innerHeight;

					var SPEED = 0.01;

					scope.$watch("model_url", function(newValue, oldValue) {
						if (newValue != oldValue) initMesh(newValue);
					});

					function init() {
						scene = new THREE.Scene();

						scene.fog = new THREE.Fog( 0xffffff, 1, 5000 );
						scene.fog.color.setHSL( 0.6, 0, 1 );

						initMesh(scope.model_url);
						initCamera();
						initLights();
						initRenderer();
					}

					function initCamera() {
						camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 5000);
						camera.position.set(0, 0, 250);
					}

					function initRenderer() {
						renderer = new THREE.WebGLRenderer({ antialias: true });
						renderer.setSize(window.innerWidth, window.innerHeight);

						renderer.setClearColor( scene.fog.color );
						renderer.setPixelRatio( window.devicePixelRatio );

						renderer.gammaInput = true;
						renderer.gammaOutput = true;

						renderer.shadowMap.enabled = true;
						renderer.shadowMap.cullFace = THREE.CullFaceBack;


						elem[0].appendChild(renderer.domElement);

						controls = new THREE.OrbitControls( camera, renderer.domElement );

						controls.rotateSpeed = 0.2;
						controls.zoomSpeed = 1.2;
						controls.panSpeed = 0.8;

						controls.enablePan = true;

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
						// LIGHTS

						hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
						hemiLight.color.setHSL( 0.6, 1, 0.6 );
						hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
						hemiLight.position.set( 0, 500, 0 );
						//scene.add( hemiLight );

						//

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

						//var light = new THREE.AmbientLight(0xffffff);
						//scene.add(light);

						// GROUND

						var groundGeo = new THREE.PlaneBufferGeometry( 10000, 10000 );
						var groundMat = new THREE.MeshPhongMaterial( { color: 0x404040, specular: 0x050505 } );
						groundMat.color.setHSL( 0.095, 1, 0.75 );

						var ground = new THREE.Mesh( groundGeo, groundMat );
						ground.rotation.x = -Math.PI/2;
						ground.position.y = -33;
						scene.add( ground );

						ground.receiveShadow = true;

						// SKYDOME

						var vertexShader = document.getElementById( 'vertexShader' ).textContent;
						var fragmentShader = document.getElementById( 'fragmentShader' ).textContent;
						var uniforms = {
							topColor: 	 { type: "c", value: new THREE.Color( 0x0077ff ) },
							bottomColor: { type: "c", value: new THREE.Color( 0xffffff ) },
							offset:		 { type: "f", value: 33 },
							exponent:	 { type: "f", value: 0.6 }
						};
						uniforms.topColor.value.copy( hemiLight.color );

						scene.fog.color.copy( uniforms.bottomColor.value );

						var skyGeo = new THREE.SphereGeometry( 4000, 32, 15 );
						var skyMat = new THREE.ShaderMaterial( { vertexShader: vertexShader, fragmentShader: fragmentShader, uniforms: uniforms, side: THREE.BackSide } );

						var sky = new THREE.Mesh( skyGeo, skyMat );
						scene.add( sky );

					}

					var mesh = null;
					function initMesh(modelUrl) {
						// TODO ambientColor and DbgColor must be removed from the exported json model
						var loader = new THREE.JSONLoader();
						loader.load(modelUrl, function(geometry, materials) {
							mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));

							mesh.scale.x = mesh.scale.y = mesh.scale.z = 3;
							mesh.castShadow = true;
							mesh.receiveShadow = true;
							mesh.position.y = -33;
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