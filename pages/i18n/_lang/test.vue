<template>
	<div class="lang-page">
		<p>{{$t('msg.greet')}}</p>
		<p>{{$store.state.lang}}</p>
		<p>{{$t('words.from')}}</p>
		<p>{{$t('words.say')}}</p>
	</div>
</template>