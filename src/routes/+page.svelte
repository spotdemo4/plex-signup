<script lang="ts">
	import type { ActionData } from './$types';

	export let form: ActionData;
	let email = '';
</script>

<div class="h-screen flex flex-col justify-center gap-3 bg-gray-800">
	<div class="flex justify-center">
		<h1 class="text-white font-bold text-4xl">TrevFlix Invite</h1>
	</div>
	<form class="flex justify-center gap-2" method="POST">
		<input
			class="border-2 border-gray-500 bg-gray-900 text-white rounded-md p-2"
			type="email"
			placeholder="Enter your email"
			name="email"
			required
			bind:value={email}
		/>
		{#if email}
			<button class="bg-blue-500 text-white rounded-md p-2" type="submit"
				><svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
					/>
				</svg>
			</button>
		{/if}
	</form>
	{#if form?.success}
		<div class="flex justify-center bg-green-900">
			<p class="text-white font-bold text-xl text-center">
				Successfully invited! Please check your email to accept the invitation.
			</p>
		</div>
	{:else if form?.success == false}
		<div class="flex justify-center bg-red-900">
			<p class="text-white font-bold text-xl text-center">{form.body}</p>
		</div>
	{/if}
</div>
