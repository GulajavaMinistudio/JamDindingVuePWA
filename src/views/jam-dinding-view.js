import { mapGetters } from 'vuex';
import '@fortawesome/fontawesome-free/css/all.min.css';

const JamDindingComponent = () => import(/* webpackChunkName: "jam-dinding-component" */ '@/components/jam-dinding/JamDindingComponent.vue');

export default {
  name: 'JamDindingView',
  components: {
    'jam-dinding': JamDindingComponent,
  },
  data() {
    return {
      key: 'value',
    };
  },
  methods: {
    setTanggalSekarang() {
      this.$store.dispatch('DateTanggalModule/getTanggalbakuActions');
    },
    pindahHalamanTentang() {
      this.$router.push('/about');
    },
  },
  computed: {
    ...mapGetters('DateTanggalModule', {
      stringWaktuTanggal: 'getTanggalBaku',
    }),
    ...mapGetters('DateTanggalModule', {
      stringTanggals: 'getTanggalBaku',
    }),
  },
  mounted() {
    this.setTanggalSekarang();
  },
};
