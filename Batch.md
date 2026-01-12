- Good to shuffle data after each epoch to ensure different batches
- Increasing batch size (fr or w/ accumulation) 
	- Effectively decreases step size -> requires more compute time
	- Reduces noise -> deterministc descent 


**How to find good batch size**
- start w/ batch that fits in mem
- 