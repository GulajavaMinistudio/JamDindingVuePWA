

export default {
  name: 'JamDindingComponent',
  data() {
    return {
      key: 'value',
      timerMenitInterval: 0,
      timerDetikInterval: 0,
    };
  },
  methods: {
    startMulaiTimer() {
      // Initialise the locale-enabled clocks
    // initInternationalClocks();
    // Initialise any local time clocks
      this.initWaktuLokal();

      // Start the seconds container moving
      this.moveJarumDetik();

      // Set the intial minute hand container transition, and then each subsequent step
      this.setupJarumMenit();
    },
    /**
     * @description Hentikan timer waktu sebelum aplikasi web ditutup
     */
    stopTimerWaktu() {
      this.stopTimerWaktuAsync()
        .then(() => {
          // console.log('time stopped');
        })
        .catch(() => {
          // console.log(error);
        });
    },
    async stopTimerWaktuAsync() {
      // promise untuk stop timer waktu
      const stopPromisedWaktu = new Promise((resolve) => {
        clearInterval(this.timerMenitInterval);
        clearInterval(this.timerDetikInterval);
        resolve(true);
      });

      const results = await stopPromisedWaktu;
      return results;
    },
    /**
     * @description Starts any clocks using the user's local time
     */
    initWaktuLokal() {
      const waktuDateNow = new Date();
      const seconds = waktuDateNow.getSeconds();
      const minutes = waktuDateNow.getMinutes();
      const hours = waktuDateNow.getHours();

      // Create an object with each hand and it's angle in degrees
      const hands = [
        {
          hand: 'hours',
          angle: (hours * 30) + (minutes / 2),
        },
        {
          hand: 'minutes',
          angle: (minutes * 6),
        },
        {
          hand: 'seconds',
          angle: (seconds * 6),
        },
      ];

      // Loop through each of these hands to set their angle
      for (let j = 0; j < hands.length; j += 1) {
        const elements = document.querySelectorAll(`.${hands[j].hand}`);

        for (let k = 0; k < elements.length; k += 1) {
          elements[k].style.webkitTransform = `rotateZ(${hands[j].angle}deg)`;
          elements[k].style.transform = `rotateZ(${hands[j].angle}deg)`;

          // If this is a minute hand, note the seconds position
          // (to calculate minute position later)
          if (hands[j].hand === 'minutes') {
            // elements[k].parentNode.setAttribute('data-second-angle', hands[j + 1].angle);

            // perbaikan dari fungsi di atas karena menggunakan type
            const element = elements[k].parentNode;
            const angles = `${hands[j + 1].angle}`;
            element.setAttribute('data-second-angle', angles);
          }
        }
      }
    },
    /**
     * @description Set a timeout for the first minute hand movement (less than 1 minute),
     * then rotate it  every minute after that
     */
    setupJarumMenit() {
      // Find out how far into the minute we are
      const containers = document.querySelectorAll('.minutes-container');
      const secondAngle = containers[0].getAttribute('data-second-angle');

      const secondAngleNumber = Number(secondAngle);

      if (secondAngleNumber > 0) {
        // Set a timeout until the end of the current minute, to move the hand
        const delay = (((360 - secondAngleNumber) / 6) + 0.1) * 1000;

        setTimeout(
          () => {
            this.moveJarumMenit(containers);
          }, delay,
        );
      }
    },
    /**
     * @description Do the first minute's rotation
     * @param {any} containers
     */
    moveJarumMenit(containers) {
      const panjangContainer = containers.length;
      for (let i = 0; i < panjangContainer; i += 1) {
        const containerSelect = containers[i];
        containerSelect.style.webkitTransform = 'rotateZ(6deg)';
        containerSelect.style.transform = 'rotateZ(6deg)';
      }

      // Then continue with a 60 second interval
      this.timerMenitInterval = setInterval(
        () => {
          for (let i = 0; i < panjangContainer; i += 1) {
            const containerSelect = containers[i];
            if (containerSelect.angle === undefined) {
              containerSelect.angle = 12;
            } else {
              containerSelect.angle += 6;
            }

            containerSelect.style.webkitTransform = `rotateZ(${containerSelect.angle}deg)`;
            containerSelect.style.transform = `rotateZ(${containerSelect.angle}deg)`;
          }

          // segarkan tanggal di parent component
          // console.log('tanggal segarkan');
          this.refreshTanggal();
        }, 60000,
      );
    },
    /**
     * @description Move the second containers
     */
    moveJarumDetik() {
      const containers = document.querySelectorAll('.seconds-container');

      const panjangContainer = containers.length;

      this.timerDetikInterval = setInterval(
        () => {
          for (let i = 0; i < panjangContainer; i += 1) {
            const containerSelect = containers[i];

            if (containerSelect.angle === undefined) {
              containerSelect.angle = 6;
            } else {
              containerSelect.angle += 6;
            }
            containerSelect.style.webkitTransform = `rotateZ(${containerSelect.angle}deg)`;
            containerSelect.style.transform = `rotateZ(${containerSelect.angle}deg)`;
          }
        }, 1000,
      );
    },
    refreshTanggal() {
      // console.log('dispatch tanggal');
      this.$store.dispatch('DateTanggalModule/getTanggalbakuActions');
    },
  },
  computed: {
    name() {
      return this.data;
    },
  },
  mounted() {
    this.startMulaiTimer();
  },
  beforeDestroy() {
    this.stopTimerWaktu();
  },
};
