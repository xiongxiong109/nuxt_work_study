<template>
  <div>
    <nuxt/>
  </div>
</template>
<style type="text/css">
	/*global css*/
	@reset-global mobile;
	
	html, body {
		overflow-x: hidden;
	}
	.container {
		transition: all .5s cubic-bezier(.55,0,.1,1);
	}
	/* transition router */
	.slide-left-enter,
	.slide-right-leave-active {
	  opacity: 0;
	  transform: translate(10%, 0);
	}
	.slide-left-leave-active,
	.slide-right-enter {
	  opacity: 0;
	  transform: translate(-10%, 0);
	}

	a {
		text-decoration: none;
	}

	/*tabbar*/
	.top-tab {
		bottom: auto;
		top: 0;
		height: 46px;
		background-image: none;
	}
	.top-tab > .mint-tab-item {
		padding: 15px 0;
		background-color: #fff;
		color: rgba(0,0,0,.6);
		position: relative;
	}
	.top-tab > .mint-tab-item.is-selected {
		background-color: #fff;
		color: #31c27c;
	}
	.top-tab > .mint-tab-item.is-selected:after {
		content: "";
	  display: block;
	  position: absolute;
	  bottom: 0;
	  left: 0;
	  right: 0;
	  height: 2px;
	  background: #31c27c;
	}
	.top-tab .mint-tab-item-label {
		font-size: 16px;
	}
	.top-tab-container {
		padding-top: 46px;
	}
	/*tabbar*/
</style>
