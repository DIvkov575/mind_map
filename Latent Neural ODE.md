As opposed to standard [[Neural ODE]] which operates on ambient? space, latent space maps into higher dimension latent space. 
Latent Neural ODE's are typically impelemented with an
1) [[Auto Encoder]] to map into latent space
2) A Neural ODE to learn progression of state
3) [[Decoder]] Map Latent space $\mapsto$ observable space