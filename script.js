import * as THREE from "https://esm.sh/three";
import { OrbitControls } from "https://esm.sh/three/examples/jsm/controls/OrbitControls.js";
import { EffectComposer } from "https://esm.sh/three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "https://esm.sh/three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "https://esm.sh/three/examples/jsm/postprocessing/UnrealBloomPass.js";
import GUI from "https://esm.sh/lil-gui";

$(document).ready(function () {
  // Form Validation Functions
  function validateLoginForm() {
    const username = $("#username").val().trim();
    const password = $("#password").val().trim();

    if (!username) {
      showValidationError("Username is required");
      return false;
    }

    if (!password) {
      showValidationError("Password is required");
      return false;
    }

    if (password.length < 6) {
      showValidationError("Password must be at least 6 characters long");
      return false;
    }
    return true;
  }

  function validateRegisterForm() {
    const username = $("#regUsername").val().trim();
    const email = $("#regEmail").val().trim();
    const password = $("#regPassword").val().trim();

    if (!username) {
      showValidationError("Username is required");
      return false;
    }

    if (!email) {
      showValidationError("Email is required");
      return false;
    }

    if (!isValidEmail(email)) {
      showValidationError("Please enter a valid email address");
      return false;
    }

    if (!password) {
      showValidationError("Password is required");
      return false;
    }

    if (password.length < 6) {
      showValidationError("Password must be at least 6 characters long");
      return false;
    }
    return true;
  }

  function validateForgotPasswordForm() {
    const email = $("#resetEmail").val().trim();

    if (!email) {
      showValidationError("Email is required");
      return false;
    }

    if (!isValidEmail(email)) {
      showValidationError("Please enter a valid email address");
      return false;
    }

    return true;
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function showValidationError(message) {
    // Remove any existing error messages
    $(".validation-error").remove();

    // Create error message element
    const errorElement = $('<div class="validation-error"></div>')
      .text(message)
      .css({
        color: "#ff3366",
        fontSize: "1.2rem",
        textAlign: "center",
        margin: "1rem 0",
        padding: "0.5rem",
        backgroundColor: "rgba(255, 51, 102, 0.1)",
        borderRadius: "4px",
        border: "1px solid rgba(255, 51, 102, 0.3)",
      });

    // Insert error message before the submit button
    $(".login__submit").before(errorElement);

    // Auto-remove error after 5 seconds
    setTimeout(() => {
      errorElement.fadeOut(300, function () {
        $(this).remove();
      });
    }, 5000);
  }

  // Form Submission Handlers
  $("#loginForm").on("submit", function (e) {
    e.preventDefault();
    if (validateLoginForm()) {
      if (animating) return;
      animating = true;
      var that = $(".login__submit")[0];
      ripple($(that), e);
      $(that).addClass("processing");
      setTimeout(function () {
        $(that).addClass("success");
        setTimeout(function () {
          $app.show();
          $app.css("top");
          $app.addClass("active");
        }, submitPhase2 - 70);
        setTimeout(function () {
          $login.hide();
          $login.addClass("inactive");
          animating = false;
          $(that).removeClass("success processing");
        }, submitPhase2);
      }, submitPhase1);
    }
  });

  // Registration form submission handler
  $("#registerForm").on("submit", function (e) {
    e.preventDefault();
    if (validateRegisterForm()) {
      if (animating) return;
      animating = true;
      var that = $(".login__submit")[0];
      ripple($(that), e);
      $(that).addClass("processing");
      setTimeout(function () {
        $(that).addClass("success");
        setTimeout(function () {
          $app.show();
          $app.css("top");
          $app.addClass("active");
        }, submitPhase2 - 70);
        setTimeout(function () {
          $login.hide();
          $login.addClass("inactive");
          animating = false;
          $(that).removeClass("success processing");
        }, submitPhase2);
      }, submitPhase1);
    }
  });

  // Forgot Password form submission handler
  $("#forgotPasswordForm").on("submit", function (e) {
    e.preventDefault();
    if (validateForgotPasswordForm()) {
      if (animating) return;
      animating = true;
      var that = $(".login__submit")[0];
      ripple($(that), e);
      $(that).addClass("processing");
      setTimeout(function () {
        $(that).addClass("success");
        setTimeout(function () {
          $app.show();
          $app.css("top");
          $app.addClass("active");
        }, submitPhase2 - 70);
        setTimeout(function () {
          $login.hide();
          $login.addClass("inactive");
          animating = false;
          $(that).removeClass("success processing");
        }, submitPhase2);
      }, submitPhase1);
    }
  });

  // Add input event listeners to clear validation errors when user starts typing
  $("input").on("input", function () {
    $(".validation-error").fadeOut(300, function () {
      $(this).remove();
    });
  });

  // jQuery animation variables and elements
  var animating = false,
    submitPhase1 = 1100, // Duration for processing animation
    submitPhase2 = 400, // Duration for success animation and app reveal
    logoutPhase1 = 800, // Duration for logout animation
    $login = $(".login"),
    $app = $(".app");

  // Function to create a ripple effect on button click
  function ripple(elem, e) {
    $(".ripple").remove(); // Remove any existing ripples
    var elTop = elem.offset().top,
      elLeft = elem.offset().left,
      x = e.pageX - elLeft, // X position relative to element
      y = e.pageY - elTop; // Y position relative to element
    var $ripple = $("<div class='ripple'></div>");
    $ripple.css({ top: y, left: x }); // Position ripple at click point
    elem.append($ripple); // Add ripple to the clicked element
  }

  // Event listener for logout button click
  $(document).on("click", ".app__logout", function (e) {
    if (animating) return; // Prevent multiple clicks during animation
    $(".ripple").remove(); // Clear any ripples
    animating = true;
    var that = this;
    $(that).addClass("clicked"); // Add clicked class for styling

    setTimeout(function () {
      $app.removeClass("active"); // Deactivate app
      $login.show(); // Show login
      $login.css("top"); // Force reflow for CSS transition
      $login.removeClass("inactive"); // Activate login
    }, logoutPhase1 - 120); // Login reveals slightly before logout animation ends
    setTimeout(function () {
      $app.hide(); // Hide app
      animating = false; // Reset animation flag
      $(that).removeClass("clicked"); // Remove clicked class
    }, logoutPhase1); // Complete logout animation
  });

  // --- Three.js Superformula Wireframe Code Starts Here ---
  class SuperformulaWireframe {
    constructor() {
      // Predefined presets for superformula parameters
      this.presets = [
        { m1: 5, n11: 10, n12: 2, n13: 7, m2: 5, n21: 10, n22: 10, n23: 10 },
        { m1: 2, n11: 1, n12: 4, n13: 8, m2: 8, n21: 1, n22: 1, n23: 4 },
        { m1: 6, n11: 1, n12: 1, n13: 1, m2: 3, n21: 1, n22: 5, n23: 1 },
        { m1: 12, n11: 15, n12: 8, n13: 8, m2: 12, n21: 8, n22: 4, n23: 15 },
      ];

      this.presetOptions = {
        "Star Crystal": 0,
        "Ocean Creature": 1,
        "Spiral Galaxy": 2,
        "Quantum Form": 3,
      };

      // Color themes for the wireframe and burst effect
      this.themes = {
        Synthwave: {
          colors: ["#ff1f5a", "#ff758a", "#1e3799", "#0984e3"],
          burstColor: "#ffffff",
        },
        Forest: {
          colors: ["#38ef7d", "#11998e", "#ffe259", "#ffa751"],
          burstColor: "#ffff99",
        },
        Ocean: {
          colors: ["#2193b0", "#38ef7d", "#00b4db", "#0083B0"],
          burstColor: "#8cffff",
        },
        Sunset: {
          colors: ["#FF416C", "#FF4B2B", "#f5af19", "#f12711"],
          burstColor: "#ffffa8",
        },
      };
      this.themeNames = Object.keys(this.themes);

      // Controllable parameters for the GUI
      this.params = {
        preset: 0,
        morphDuration: 2.0,

        pulseSpeed: 1.0,
        pulseIntensity: 0.2,
        microAnimationIntensity: 0.15,
        colorTheme: "Sunset",

        burstSpeed: 0.8,
        burstDuration: 6.0,
        multiWave: true,

        bloomStrength: 1.4,
        bloomRadius: 0.5,
        bloomThreshold: 0.18,
      };

      // Resolution for generating the superformula geometry
      this.resolutionTheta = 100;
      this.resolutionPhi = 100;

      // State variables for morphing animation
      this.currentPresetParams = { ...this.presets[this.params.preset] };
      this.targetPresetParams = { ...this.presets[this.params.preset] };
      this.isMorphing = false;
      this.morphStartTime = 0;

      // State variables for burst effect
      this.burstActive = 0.0;
      this.burstStartTime = -1.0;
      this.lastBurstTime = 0;

      // Superformula mathematical function
      this.superformula = (angle, m, n1, n2, n3, a = 1, b = 1) => {
        const term1 = Math.pow(Math.abs(Math.cos((m * angle) / 4) / a), n2);
        const term2 = Math.pow(Math.abs(Math.sin((m * angle) / 4) / b), n3);
        const sum = term1 + term2;
        if (sum === 0) return 0;
        return Math.pow(sum, -1 / n1);
      };

      // Initialize the Three.js scene, GUI, and start animation
      this.init();
      this.setupGUI();
      this.animate();
    }

    // Initialize Three.js scene, camera, renderer, and post-processing
    init() {
      this.scene = new THREE.Scene();
      // *** IMPORTANT CHANGE: Target the existing 'scene-container' within your HTML ***
      this.container = document.getElementById("scene-container");

      // Check if the container exists before proceeding
      if (!this.container) {
        console.error(
          "Error: '#scene-container' not found in the DOM. Please ensure your HTML has this div within the login form."
        );
        return;
      }

      // Get dimensions from the container
      const containerWidth = this.container.clientWidth;
      const containerHeight = this.container.clientHeight;

      this.camera = new THREE.PerspectiveCamera(
        75,
        containerWidth / containerHeight,
        0.1,
        1000
      );
      this.camera.position.set(0, 0, 2.5);
      this.camera.lookAt(0, 0, 0);

      // Set alpha: true for transparent background, allowing form background to show
      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      this.renderer.setSize(containerWidth, containerHeight);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      this.renderer.toneMappingExposure = 1.0;

      this.container.appendChild(this.renderer.domElement);

      this.composer = new EffectComposer(this.renderer);
      this.composer.addPass(new RenderPass(this.scene, this.camera));

      this.bloomPass = new UnrealBloomPass(
        new THREE.Vector2(containerWidth, containerHeight),
        this.params.bloomStrength,
        this.params.bloomRadius,
        this.params.bloomThreshold
      );
      this.composer.addPass(this.bloomPass);

      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.05;
      this.controls.autoRotate = false;
      this.controls.minDistance = 1;

      this.clock = new THREE.Clock();

      this.createWireframe();
      this.updateWireframeGeometry();

      // Event listeners for window resize and mouse interactions
      window.addEventListener("resize", () => this.onResize());

      // Add event listeners directly to the renderer's DOM element for controls
      // This ensures controls are only active within the 3D area
      this.renderer.domElement.addEventListener("click", (event) => {
        // Prevent burst if user is dragging the model
        if (!this.isDragging) {
          this.triggerBurst();
        }
      });

      // Track mouse drag state for click vs drag differentiation
      this.renderer.domElement.addEventListener("mousedown", () => {
        this.isDragging = false;
        this.isMouseDown = true;
      });
      this.renderer.domElement.addEventListener("mousemove", () => {
        if (this.isMouseDown) this.isDragging = true;
      });
      this.renderer.domElement.addEventListener("mouseup", () => {
        this.isMouseDown = false;
      });
    }

    // Triggers the energy burst animation
    triggerBurst() {
      const currentTime = this.clock.getElapsedTime();

      // Prevent rapid-fire bursts
      if (currentTime - this.lastBurstTime > 0.3) {
        this.burstActive = 1.0; // Activate burst effect
        this.burstStartTime = currentTime;
        this.lastBurstTime = currentTime;

        // Animate the energy burst button
        const burstButton = document.querySelector(".energy-button");
        if (burstButton) {
          burstButton.style.boxShadow = "0 0 40px rgba(255, 175, 25, 0.9)";
          burstButton.style.transform = "scale(1.15)";

          const theme = this.themes[this.params.colorTheme];
          const colors = theme.colors;
          burstButton.style.background = `linear-gradient(to right, ${colors[0]}, ${colors[2]})`;

          setTimeout(() => {
            burstButton.style.boxShadow = "0 0 30px rgba(255, 100, 75, 0.8)";
            burstButton.style.transform = "scale(1.1)";
          }, 150);

          setTimeout(() => {
            burstButton.style.boxShadow = "0 0 20px rgba(245, 175, 25, 0.6)";
            burstButton.style.transform = "scale(1.05)";
            burstButton.style.background = `linear-gradient(to right, ${colors[1]}, ${colors[3]})`;
          }, 300);

          setTimeout(() => {
            burstButton.style.boxShadow = "0 8px 20px rgba(255, 75, 43, 0.6)";
            burstButton.style.transform = "";
            burstButton.style.background =
              "linear-gradient(to right, rgba(255, 65, 108, 0.9), rgba(255, 75, 43, 0.9))";
          }, 500);
        }

        // Update shader uniforms for burst effect
        if (this.wireframeMesh) {
          const theme = this.themes[this.params.colorTheme];
          const burstColor = theme.burstColor || "#ffffff";

          this.wireframeMesh.material.uniforms.burstActive.value =
            this.burstActive;
          this.wireframeMesh.material.uniforms.burstStartTime.value =
            this.burstStartTime;
          this.wireframeMesh.material.uniforms.burstColor.value.set(burstColor);
        }
      }
    }

    // Creates the initial wireframe geometry and material
    createWireframe() {
      const geometry = new THREE.BufferGeometry();
      const resTheta = this.resolutionTheta;
      const resPhi = this.resolutionPhi;
      const vertexCount = (resTheta + 1) * (resPhi + 1);

      const positions = new Float32Array(vertexCount * 3);
      const colors = new Float32Array(vertexCount * 3);
      const indices = [];

      // Generate indices for line segments (grid-like wireframe)
      for (let i = 0; i < resTheta; i++) {
        for (let j = 0; j < resPhi; j++) {
          const current = i * (resPhi + 1) + j;
          const nextTheta = (i + 1) * (resPhi + 1) + j;
          const nextPhi = current + 1;
          indices.push(current, nextTheta); // Vertical line
          indices.push(current, nextPhi); // Horizontal line
        }
        // Connect last column of current row to first column of next row
        indices.push(
          i * (resPhi + 1) + resPhi,
          (i + 1) * (resPhi + 1) + resPhi
        );
      }
      // Connect last row horizontally
      const lastRowStart = resTheta * (resPhi + 1);
      for (let j = 0; j < resPhi; j++) {
        indices.push(lastRowStart + j, lastRowStart + j + 1);
      }

      geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(positions, 3)
      );
      geometry.setAttribute(
        "color",
        new THREE.Float32BufferAttribute(colors, 3)
      );
      geometry.setIndex(new THREE.Uint32BufferAttribute(indices, 1));

      // Shader material for custom rendering effects (pulse, dash, burst)
      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0.0 },
          pulseSpeed: { value: this.params.pulseSpeed },
          pulseIntensity: { value: this.params.pulseIntensity },
          microAnimationIntensity: {
            value: this.params.microAnimationIntensity,
          },
          dashSize: { value: 0.1 },
          dashRatio: { value: 0.5 },
          burstActive: { value: this.burstActive },
          burstStartTime: { value: this.burstStartTime },
          burstSpeed: { value: this.params.burstSpeed },
          burstDuration: { value: this.params.burstDuration },
          burstColor: {
            value: new THREE.Color(
              this.themes[this.params.colorTheme].burstColor
            ),
          },
          multiWave: { value: this.params.multiWave ? 1.0 : 0.0 },
          morphProgress: { value: 0.0 }, // Used for morphing animation effect
        },
        vertexShader: `
                    uniform float time;
                    uniform float pulseSpeed;
                    uniform float pulseIntensity;
                    uniform float microAnimationIntensity;
                    uniform float morphProgress;

                    varying vec3 vColor;
                    varying vec3 vPos;
                    varying float vLineDistance;

                    void main() {
                        vColor = color;
                        vPos = position;

                        vLineDistance = length(position); // Distance from origin for dash effect

                        // Calculate pulse effect based on distance and time
                        float pulse = sin(length(position) * 2.0 - time * pulseSpeed) * pulseIntensity;

                        // Calculate micro-animations for subtle movement
                        float microAnim1 = sin(position.x * 8.0 + time * 3.0) * microAnimationIntensity;
                        float microAnim2 = cos(position.y * 9.0 + time * 2.7) * microAnimationIntensity;
                        float microAnim3 = sin(position.z * 7.0 + time * 3.3) * microAnimationIntensity;

                        vec3 microOffset = vec3(microAnim1, microAnim2, microAnim3);
                        vec3 pulseOffset = normalize(position) * pulse;

                        // Scale micro-animation intensity during morphing
                        microOffset *= (1.0 + morphProgress * 3.0);

                        // Apply all animations to the vertex position
                        vec3 animatedPos = position + pulseOffset + microOffset;
                        gl_Position = projectionMatrix * modelViewMatrix * vec4(animatedPos, 1.0);
                    }
                `,
        fragmentShader: `
                    uniform float time;
                    uniform float dashSize;
                    uniform float dashRatio;
                    uniform float burstActive;
                    uniform float burstStartTime;
                    uniform float burstSpeed;
                    uniform float burstDuration;
                    uniform vec3 burstColor;
                    uniform float multiWave;

                    varying vec3 vColor;
                    varying vec3 vPos;
                    varying float vLineDistance;

                    void main() {
                        vec3 finalColor = vColor;
                        float finalIntensity = 1.0;

                        // Create dashed line effect
                        float totalSize = dashSize * (1.0 + dashRatio);
                        float patternPos = mod(vLineDistance + time * 0.2, totalSize);
                        float dashPart = step(patternPos, dashSize);

                        if (dashPart < 0.1) {
                            discard; // Discard fragment for the empty part of the dash
                        }

                        finalIntensity *= (1.0 + dashPart * 0.5); // Boost intensity for visible dashes

                        // Apply burst effect if active
                        if (burstActive > 0.5) {
                            float burstElapsed = max(0.0, time - burstStartTime);
                            if (burstElapsed < burstDuration) {
                                float distOrigin = length(vPos);
                                float progress = burstElapsed / burstDuration;

                                float baseSpeed = burstSpeed;
                                float mainRadius = burstElapsed * baseSpeed;
                                float mainThickness = 0.4 * (1.0 - 0.5 * progress);

                                float mainDist = abs(distOrigin - mainRadius);
                                float mainWave = 1.0 - smoothstep(0.0, mainThickness, mainDist);

                                float trailFactor = smoothstep(0.0, mainRadius, distOrigin) * (1.0 - smoothstep(mainRadius * 0.5, mainRadius, distOrigin));

                                float secondaryWave = 0.0;
                                float tertiaryWave = 0.0;

                                // Generate multiple waves if multiWave is enabled
                                if (multiWave > 0.5) {
                                    float secondaryRadius = burstElapsed * (baseSpeed * 1.5);
                                    float secondaryThickness = 0.3 * (1.0 - 0.6 * progress);
                                    float secondaryDist = abs(distOrigin - secondaryRadius);
                                    secondaryWave = 1.0 - smoothstep(0.0, secondaryThickness, secondaryDist);
                                    secondaryWave *= 0.7 * (1.0 - progress * 0.7);

                                    float tertiaryRadius = burstElapsed * (baseSpeed * 0.7);
                                    float tertiaryThickness = 0.25 * (1.0 - 0.4 * progress);
                                    float tertiaryDist = abs(distOrigin - tertiaryRadius);
                                    tertiaryWave = 1.0 - smoothstep(0.0, tertiaryThickness, tertiaryDist);
                                    tertiaryWave *= 0.5 * (1.0 - progress * 0.5);
                                }

                                vec3 waveColorShift = burstColor;
                                if (secondaryWave > 0.01) {
                                    waveColorShift = mix(burstColor, vec3(0.5, 0.8, 1.0), 0.3);
                                }
                                if (tertiaryWave > 0.01) {
                                    waveColorShift = mix(burstColor, vec3(0.8, 0.5, 1.0), 0.3);
                                }

                                float combinedWave = max(max(mainWave, secondaryWave * 0.8), tertiaryWave * 0.6);
                                combinedWave = max(combinedWave, trailFactor * 0.4);

                                float timeFade = 1.0 - smoothstep(burstDuration * 0.6, burstDuration, burstElapsed);
                                combinedWave *= timeFade;

                                finalColor = mix(finalColor, waveColorShift, combinedWave * 0.8);
                                finalIntensity += combinedWave * 3.0;

                                // Add subtle ripple effect within the burst
                                float rippleFactor = sin(distOrigin * 10.0 - burstElapsed * 5.0) * 0.5 + 0.5;
                                rippleFactor *= smoothstep(0.0, mainRadius * 0.8, distOrigin) * (1.0 - smoothstep(mainRadius * 0.8, mainRadius, distOrigin));
                                rippleFactor *= 0.15 * timeFade;

                                finalIntensity += rippleFactor;
                            }
                        }

                        gl_FragColor = vec4(finalColor * finalIntensity, 1.0);
                    }
                `,
        vertexColors: true, // Enable vertex colors from geometry attribute
      });

      this.wireframeMesh = new THREE.LineSegments(geometry, material);
      this.scene.add(this.wireframeMesh);
    }

    // Updates the positions and colors of the wireframe vertices based on current/interpolated parameters
    updateWireframeGeometry() {
      if (!this.wireframeMesh) return;

      const geometry = this.wireframeMesh.geometry;
      const positions = geometry.attributes.position.array;
      const colors = geometry.attributes.color.array;

      // Get parameters for rendering (either current or interpolated during morphing)
      const sfParams = this.isMorphing
        ? this.getInterpolatedParams()
        : this.currentPresetParams;
      const resTheta = this.resolutionTheta;
      const resPhi = this.resolutionPhi;

      // Get current theme colors
      const theme = this.themes[this.params.colorTheme];
      const themeColors = theme.colors.map((color) => new THREE.Color(color));

      let vertexIndex = 0;
      for (let i = 0; i <= resTheta; i++) {
        const theta = THREE.MathUtils.mapLinear(
          i,
          0,
          resTheta,
          -Math.PI / 2,
          Math.PI / 2
        );
        const r1 = this.superformula(
          theta,
          sfParams.m1,
          sfParams.n11,
          sfParams.n12,
          sfParams.n13
        );

        for (let j = 0; j <= resPhi; j++) {
          const phi = THREE.MathUtils.mapLinear(
            j,
            0,
            resPhi,
            -Math.PI,
            Math.PI
          );
          const r2 = this.superformula(
            phi,
            sfParams.m2,
            sfParams.n21,
            sfParams.n22,
            sfParams.n23
          );

          // Calculate Cartesian coordinates from spherical superformula
          const x = r1 * Math.cos(theta) * r2 * Math.cos(phi);
          const y = r1 * Math.sin(theta);
          const z = r1 * Math.cos(theta) * r2 * Math.sin(phi);

          positions[vertexIndex * 3 + 0] = x;
          positions[vertexIndex * 3 + 1] = y;
          positions[vertexIndex * 3 + 2] = z;

          // Interpolate color based on Y-position (vertical gradient)
          const colorMix = THREE.MathUtils.smoothstep(y, -1.5, 1.5); // Normalize Y to 0-1 range

          const colorIndex1 = Math.floor(colorMix * (themeColors.length - 1));
          const colorIndex2 = Math.min(colorIndex1 + 1, themeColors.length - 1);
          const colorFraction =
            colorMix * (themeColors.length - 1) - colorIndex1;

          const vertexColor = themeColors[colorIndex1]
            .clone()
            .lerp(themeColors[colorIndex2], colorFraction);

          colors[vertexIndex * 3 + 0] = vertexColor.r;
          colors[vertexIndex * 3 + 1] = vertexColor.g;
          colors[vertexIndex * 3 + 2] = vertexColor.b;

          vertexIndex++;
        }
      }

      // Mark attributes for update
      geometry.attributes.position.needsUpdate = true;
      geometry.attributes.color.needsUpdate = true;
      geometry.computeBoundingSphere(); // Recalculate bounding sphere for culling/frustum checks
    }

    // Interpolates superformula parameters during morphing
    getInterpolatedParams() {
      const duration = Math.max(0.001, this.params.morphDuration);
      const elapsedTime = this.clock.getElapsedTime() - this.morphStartTime;
      const totalProgress = Math.min(1.0, elapsedTime / duration);

      // Update morphProgress uniform in shader for visual effect
      if (
        this.wireframeMesh &&
        this.wireframeMesh.material.uniforms.morphProgress
      ) {
        const morphEffect = Math.sin(totalProgress * Math.PI); // Smooth in-out effect
        this.wireframeMesh.material.uniforms.morphProgress.value = morphEffect;
      }

      const interpolated = {};
      for (const key in this.currentPresetParams) {
        // Use sine interpolation for smoother morphing
        const factor = Math.sin((totalProgress * Math.PI) / 2);
        interpolated[key] = THREE.MathUtils.lerp(
          this.currentPresetParams[key],
          this.targetPresetParams[key],
          factor
        );
      }
      return interpolated;
    }

    // Initiates the morphing animation to a new preset
    startMorphing(targetPresetIndex) {
      const targetIndex = Number(targetPresetIndex);
      if (
        isNaN(targetIndex) ||
        targetIndex < 0 ||
        targetIndex >= this.presets.length
      ) {
        console.error("Invalid target preset index:", targetPresetIndex);
        return;
      }

      // If already morphing, set current params to interpolated value to ensure smooth transition
      if (!this.isMorphing) {
        this.currentPresetParams = { ...this.presets[this.params.preset] };
      } else {
        this.currentPresetParams = this.getInterpolatedParams();
      }

      this.params.preset = targetIndex; // Update the GUI's selected preset
      this.targetPresetParams = { ...this.presets[targetIndex] };

      this.isMorphing = true;
      this.morphStartTime = this.clock.getElapsedTime();
    }

    // Sets up the lil-gui interface for controlling parameters
    setupGUI() {
      // Custom styles for lil-gui (injected directly into head)
      const customStyles = document.createElement("style");
      customStyles.textContent = `
                .lil-gui {
                    border-radius: 12px;
                    width: 280px;
                    font-family: 'Inter', sans-serif;
                    backdrop-filter: blur(12px);
                    border: 1px solid rgba(255, 255, 255, 0.15);
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
                    overflow: hidden;
                    opacity: 0.92;
                    transition: opacity 0.3s;
                    background: rgba(20, 20, 28, 0.5);
                }

                .lil-gui:hover {
                    opacity: 0.98;
                }

                .lil-gui .title {
                    border-radius: 10px 10px 0 0;
                    font-weight: bold;
                    letter-spacing: 0.5px;
                    text-transform: uppercase;
                    font-size: 11px;
                    padding: 10px 12px;
                    transition: background-color 0.3s;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                }

                .lil-gui .controller {
                    border-radius: 6px;
                    margin: 4px 6px;
                    padding: 6px 10px;
                    background: rgba(60, 60, 80, 0.25);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    transition: all 0.2s;
                }

                .lil-gui .controller:hover {
                    background-color: rgba(80, 80, 120, 0.35);
                    border-color: rgba(255, 255, 255, 0.1);
                }

                .lil-gui .controller.color input[type="color"] {
                    border-radius: 6px;
                    border: 2px solid rgba(255, 255, 255, 0.2);
                    width: 16px;
                    height: 16px;
                }

                .lil-gui button {
                    border-radius: 6px;
                    background: linear-gradient(to right, rgba(60, 60, 100, 0.8), rgba(80, 80, 150, 0.8));
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    transition: all 0.2s;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
                }

                .lil-gui button:hover {
                    background: linear-gradient(to right, rgba(80, 80, 150, 0.9), rgba(100, 100, 200, 0.9));
                    transform: translateY(-1px);
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
                }

                .lil-gui .controller select {
                    background: rgba(40, 40, 60, 0.7);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 4px;
                    padding: 3px 6px;
                    color: white;
                }

                .lil-gui .folder > .title {
                    background: rgba(60, 60, 100, 0.4);
                }

                .lil-gui.root {
                    margin-top: 10px;
                    margin-right: 10px;
                }
            `;
      document.head.appendChild(customStyles);

      this.gui = new GUI();

      const shapeFolder = this.gui.addFolder("Shape & Morphing");
      this.guiPresetController = shapeFolder
        .add(this.params, "preset", this.presetOptions)
        .name("Shape Preset")
        .listen()
        .onChange((value) => {
          this.startMorphing(value);
        });
      shapeFolder
        .add(this.params, "morphDuration", 0.5, 5.0, 0.1)
        .name("Morph Duration");

      const animFolder = this.gui.addFolder("Animation & Color");
      animFolder
        .add(this.params, "pulseSpeed", 0, 2, 0.05)
        .name("Pulse Speed")
        .onChange((value) => {
          if (this.wireframeMesh)
            this.wireframeMesh.material.uniforms.pulseSpeed.value = value;
        });
      animFolder
        .add(this.params, "pulseIntensity", 0, 0.5, 0.01)
        .name("Pulse Intensity")
        .onChange((value) => {
          if (this.wireframeMesh)
            this.wireframeMesh.material.uniforms.pulseIntensity.value = value;
        });
      animFolder
        .add(this.params, "microAnimationIntensity", 0, 0.3, 0.01)
        .name("Micro-Animations")
        .onChange((value) => {
          if (this.wireframeMesh)
            this.wireframeMesh.material.uniforms.microAnimationIntensity.value =
              value;
        });
      animFolder
        .add(this.params, "colorTheme", this.themeNames)
        .name("Color Theme")
        .onChange(() => {
          this.updateWireframeGeometry(); // Update colors on geometry
          if (
            this.wireframeMesh &&
            this.wireframeMesh.material.uniforms.burstColor
          ) {
            const themeColor =
              this.themes[this.params.colorTheme].burstColor || "#ffffff";
            this.wireframeMesh.material.uniforms.burstColor.value.set(
              themeColor
            );
          }
        });

      const bloomFolder = this.gui.addFolder("Bloom Effect");
      bloomFolder
        .add(this.params, "bloomStrength", 0, 3)
        .name("Strength")
        .onChange((value) => {
          this.bloomPass.strength = value;
        });
      bloomFolder
        .add(this.params, "bloomRadius", 0, 2)
        .name("Radius")
        .onChange((value) => {
          this.bloomPass.radius = value;
        });
      bloomFolder
        .add(this.params, "bloomThreshold", 0, 1)
        .name("Threshold")
        .onChange((value) => {
          this.bloomPass.threshold = value;
        });

      const burstFolder = this.gui.addFolder("Energy Burst");
      burstFolder
        .add(this.params, "multiWave")
        .name("Multi-Wave Effect")
        .onChange((value) => {
          if (this.wireframeMesh) {
            this.wireframeMesh.material.uniforms.multiWave.value = value
              ? 1.0
              : 0.0;
          }
        });

      // Add a custom button for the energy burst effect
      const burstButton = document.createElement("button");
      burstButton.textContent = "✨ ENERGY BURST ✨";
      burstButton.className = "energy-button";
      burstButton.onclick = () => this.triggerBurst();
      this.gui.domElement.appendChild(burstButton);

      // Open relevant GUI folders by default
      shapeFolder.open();
      animFolder.open();
      burstFolder.open();
    }

    // Main animation loop
    animate() {
      requestAnimationFrame(() => this.animate()); // Request next frame
      const elapsedTime = this.clock.getElapsedTime();
      const delta = this.clock.getDelta();

      // Handle morphing animation
      if (this.isMorphing) {
        const morphProgress =
          (elapsedTime - this.morphStartTime) /
          Math.max(0.001, this.params.morphDuration);
        if (morphProgress >= 1.0) {
          this.isMorphing = false;
          this.currentPresetParams = { ...this.targetPresetParams }; // Lock to target params
          this.updateWireframeGeometry(); // Final update with target shape
          if (this.guiPresetController)
            this.guiPresetController.updateDisplay(); // Update GUI display
        } else {
          this.updateWireframeGeometry(); // Update geometry during morph
        }
      }

      // Update shader uniforms for time and burst effect
      if (this.wireframeMesh && this.wireframeMesh.material.uniforms) {
        this.wireframeMesh.material.uniforms.time.value = elapsedTime;
        this.wireframeMesh.material.uniforms.burstActive.value =
          this.burstActive;
        this.wireframeMesh.material.uniforms.burstStartTime.value =
          this.burstStartTime;

        // Deactivate burst after its duration
        if (
          this.burstActive > 0.5 &&
          elapsedTime - this.burstStartTime >= this.params.burstDuration
        ) {
          this.burstActive = 0.0;
          this.burstStartTime = -1.0;
        }
      }

      this.controls.update(delta); // Update orbit controls for camera movement
      this.composer.render(); // Render the scene with post-processing effects
    }

    // Handles window resize events
    onResize() {
      // Use the container's dimensions for resizing
      const containerWidth = this.container.clientWidth;
      const containerHeight = this.container.clientHeight;

      this.camera.aspect = containerWidth / containerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(containerWidth, containerHeight);
      this.composer.setSize(containerWidth, containerHeight);
    }
  }

  // Initialize the SuperformulaWireframe when the document is ready
  new SuperformulaWireframe();
  // --- Three.js Superformula Wireframe Code Ends Here ---
});

const fragmentShaderSource = `#version 300 es
precision highp float;

uniform float time;
uniform vec2 vp;
in vec2 uv;
out vec4 fragColor;

float rand(vec2 p) {
    return fract(sin(dot(p.xy, vec2(1., 300.))) * 43758.5453123);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = rand(i);
    float b = rand(i + vec2(1.0, 0.0));
    float c = rand(i + vec2(0.0, 1.0));
    float d = rand(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

#define OCTAVES 5
float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.4;
    for (int i = 0; i < OCTAVES; i++) {
        value += amplitude * noise(p);
        p *= 2.0;
        amplitude *= 0.4;
    }
    return value;
}

void main() {
    vec2 p = uv.xy;
    p.x *= vp.x / vp.y;

    float gradient = mix(p.y * 0.6 + 0.1, p.y * 1.2 + 0.9, fbm(p));
    float speed = 0.2;
    float details = 7.0;
    float force = 0.9;
    float shift = 0.5;

    vec2 fast = vec2(p.x, p.y - time * speed) * details;
    float ns_a = fbm(fast);
    float ns_b = force * fbm(fast + ns_a + time) - shift;
    float nns = force * fbm(vec2(ns_a, ns_b));
    float ins = fbm(vec2(ns_b, ns_a));

    vec3 c1 = mix(vec3(0.9, 0.5, 0.3), vec3(0.5, 0.0, 0.0), ins + shift);
    fragColor = vec4(c1 + vec3(ins - gradient), 1.0);
}
`;

class WebGLHandler {
  vertexShaderSource = `#version 300 es
        precision mediump float;
        const vec2 positions[6] = vec2[6](
            vec2(-1.0, -1.0), vec2(1.0, -1.0),
            vec2(-1.0, 1.0), vec2(-1.0, 1.0),
            vec2(1.0, -1.0), vec2(1.0, 1.0));
        out vec2 uv;
        void main() {
            uv = positions[gl_VertexID];
            gl_Position = vec4(positions[gl_VertexID], 0.0, 1.0);
        }`;

  constructor(canvas, fragmentShaderSource) {
    this.cn = canvas;
    this.gl = canvas.getContext("webgl2");
    this.startTime = Date.now();

    this.resize();
    window.addEventListener("resize", () => this.resize());

    this.program = this.gl.createProgram();
    this.compileShader(this.vertexShaderSource, this.gl.VERTEX_SHADER);
    this.compileShader(fragmentShaderSource, this.gl.FRAGMENT_SHADER);
    this.gl.linkProgram(this.program);
    this.gl.useProgram(this.program);

    this.timeLocation = this.gl.getUniformLocation(this.program, "time");
    this.resolutionLocation = this.gl.getUniformLocation(this.program, "vp");

    this.render();
  }

  resize() {
    this.cn.width = window.innerWidth;
    this.cn.height = window.innerHeight;
    this.gl.viewport(0, 0, this.cn.width, this.cn.height);
  }

  compileShader(source, type) {
    const shader = this.gl.createShader(type);
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);
    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      console.error(this.gl.getShaderInfoLog(shader));
      this.gl.deleteShader(shader);
      return null;
    }
    return this.gl.attachShader(this.program, shader);
  }

  render = () => {
    this.gl.uniform1f(this.timeLocation, (Date.now() - this.startTime) / 1000);
    this.gl.uniform2fv(this.resolutionLocation, [
      this.cn.width,
      this.cn.height,
    ]);
    this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
    window.requestAnimationFrame(this.render);
  };
}

const canvas = document.getElementById("shader-bg");
const webGL = new WebGLHandler(canvas, fragmentShaderSource);
