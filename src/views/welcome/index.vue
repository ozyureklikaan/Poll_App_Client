<template >
	<div class="container justify-center">
    	<div class="row justify-center" style="max-height: 100%;">
      		<div class="col-6 pa-6 custom-card">
        		<!-- style="text-align: -webkit-center;" -->
        		<div class="mb-10">
          			<v-tabs background-color="rgba(30,30,30, 0)" v-model="tabs" centered>
            			<v-tabs-slider color="#FFCC41"></v-tabs-slider>
            			<v-tab style="color:white">Add Poll</v-tab>
            			<v-tab style="color:white">Search Poll</v-tab>
          			</v-tabs>
        		</div>

        		<div class="mt-10 context">
         			<!-- style="max-height: 80vh" -->
          			<v-card class="context">
            			<v-tabs-items v-model="tabs">
              				<v-tab-item>
                				<v-card flat>
                  					<v-sheet
                    					class="v-sheet--offset mx-auto d-flex justify-center align-center"
                    					color="#FFCC41"
                    					elevation="12"
                    					height="100px"
                    					max-width="calc(100% - 50px)"
                  					>
										<v-text-field
											:tabindex="1"
											v-model="poll.Title"
											filled
											color="#1e1e1e"
											background-color="#FFCC41"
											label="Poll Title"
											class="poll-name ma-3"
											dense
											clearable
										></v-text-field>
                  					</v-sheet>

									<v-row class="pt-0 mr-1 pb-5 pl-1 justify-end">
										<v-btn :tabindex="2" v-on:click="addNewOption" class="mr-5" color="info">
											Add Option
											<v-icon class="pl-1">mdi-plus</v-icon>
										</v-btn>
									</v-row>

                  					<v-card-text class="overflow-y-auto pt-0 pb-0" v-scroll style="max-height: 40vh">
										<v-row v-for="(option,index) in poll.Options" :key="index" class="pa-1">
											<v-text-field class="ml-3 mr-3" :tabindex="index + 3" v-model="option.Content" filled dense color="#FDA856" clearable :label="'Poll Option ' + (index + 1)"></v-text-field>
										</v-row>
                  					</v-card-text>

									<v-row class="pt-0 pr-1 pb-5 pl-1 justify-end">
										<v-btn :tabindex="18" class="mr-7 mt-5" :disabled="checkPollForCreate()" v-on:click="createPoll" color="success">
											Create Poll
											<v-icon class="pl-1">post_add</v-icon>
										</v-btn>
									</v-row>
                				</v-card>
              				</v-tab-item>

              				<v-tab-item>
                				<v-card flat>
									<v-sheet
										class="v-sheet--offset mx-auto d-flex justify-center align-center"
										color="#FFCC41"
										elevation="12"
										height="100px"
										max-width="calc(100% - 50px)"
									>
										<v-text-field
											:tabindex="1"
											filled
											color="#1e1e1e"
											background-color="#FFCC41"
											dense
											clearable
											class="search-poll ma-3"
											v-model="searchPollId"
											append-icon="mdi-magnify"
											label="Search"
											@blur="changeSearch()"
											@keydown.enter="changeSearch()"
											v-mask="'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX'"
										></v-text-field>
                  					</v-sheet>

									<v-card-text v-if="findPoll" class="overflow-y-auto pt-0 pb-0" v-scroll style="max-height: 40vh">
										<v-text-field class="ml-3 mr-3" filled disabled dense color="#FDA856" :label="findPoll.Title"></v-text-field>
										<v-row v-for="(option, index) in findPoll.Options" :key="index" class="pa-1">
											<v-text-field class="ml-3 mr-3" filled disabled dense color="#FDA856" :label="option.Content"></v-text-field>
											<v-btn v-if="!isPollCreator" @click="useVote(option.Id)" :disabled="isVoted(option)" :tabindex="index + 2" class="mr-2" fab color="#1e1e1e">
												<v-icon large color="#FFCC41">check</v-icon>
											</v-btn>
											<v-card class="ml-3 mr-5" v-if="isPollCreator" :elevation="0">
												<v-card-text>
													<p class="text-center ma-0 vote-count">{{ option.Votes.length }}</p>
												</v-card-text>
											</v-card>
										</v-row>
                  					</v-card-text>

									<v-card-text v-if="!findPoll" class="justify-center" v-scroll style="height: 30vh; text-align: center;">
										<v-chip
											class="mt-12"
											large
										>
											<!-- @click="$refs.searchBox.$el.focus()" -->
											Please enter poll key for search
											<v-icon class="pl-1">mdi-magnify</v-icon>
										</v-chip>
                  					</v-card-text>
                				</v-card>
              				</v-tab-item>
            			</v-tabs-items>
          			</v-card>
        		</div>
      		</div>
    	</div>
  	</div>
</template>

<script src="./index.ts"></script>

<style>
	.container {
		height: 100vh;
		justify-content: center;
		align-items: center;
		display: flex;
	}

	.v-sheet--offset {
		position: relative;
		top: -24px;
	}

	.poll-title {
		margin-top: 12px;
		color: rgba(30, 30, 30);
		font-family: "Courier New", Courier, monospace;
		font-size: 20px;
		font-weight: bold;
	}

	.custom-card {
		background-color: rgba(30, 30, 30, 0.6);
		border-radius: 20px;
		min-width: 310px;
		min-height: 570px;
		max-height: 80%;
	}

	.context {
		max-height: 80vh;
		min-width: 262px;
		min-height: 478px;
	}

	.poll-name {
		font-size: 20px;
	}

	.vote-count {
		font-size: 20px;
		font-weight: bold;
	}
</style>