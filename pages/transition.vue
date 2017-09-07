<template>
	<div class="transition-test container">
		<transition-group name="fade" mode="out-in">
			<button @click="evt_change_toggle" v-if="!isOn" key="on">on</button>
			<button @click="evt_change_toggle" v-else key="off">off</button>
		</transition-group>
	</div>
</template>
<script type="text/javascript">
	export default {
		data: () => {
			return {
				isOn: true
			}
		},
		methods: {
			evt_change_toggle() {
				this.isOn = !this.isOn
			}
		}
	}
</script>
<style type="text/css">
	.transition-test {
		position: relative;
	}
	button {
		position: absolute;
		top: 0;
		left: 0;
		opacity: 1;
		transition: .3s ease;
	}
	.fade-enter-active {
	  opacity: 0;
	}
	.fade-leave-active {
	  opacity: 0;
	}
</style>