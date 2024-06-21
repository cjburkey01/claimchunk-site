# For Players

If at any point you need in-game advice, the `/chunk help` command lists
other commands you have access to on your server, though they are not the 
easiest to read in that form.

If you want to avoid using commands, most common operations can be performed
in the GUI, accessible via the `/chunk gui` command.

### Claiming and Unclaiming

Unsurprisingly, `/chunk claim` and `/chunk unclaim` work how they sound.
If your server has economy support enabled, you'll need to have enough money to
claim. When unclaiming a chunk, your server may also have refunding enabled,
which will return some amount of money.

To unclaim all chunks in the world you're standing in, use
`/chunk unclaim all`. To unclaim all of your chunks in all worlds, use
`/chunk unclaim all true`.

If your server has auto-claiming enabled, you can use `/chunk auto` to start
automatically claiming chunks you walk into, provided that they aren't already
claimed and you have enough money to make the purchase.

### Chunk Info

You can use `/chunk list` to view a list of the chunks you own, and
`/chunk info` to see information about the chunk you're currently standing in.

You can use `/chunk name` to set/reset your chunk's display name in other
player's on-screen popups. If you type `/chunk name <new name>`, the name will be
updated; if you don't provide a name, the display name will be reset and your
in-game player name will be shown.

To show an outline around the chunk you're standing in, use `/chunk show`, and
to outline nearby claimed chunks, use `/chunk show claimed`

If you would like to see a list of nearby chunks that are owned by other
players, you can use `/chunk scan <distance in chunks>`

### Permissions and Other Players

Similar to plugins like *Factions*, you can control what other players
are allowed to do in your chunks. To set which permissions that players will
have in your chunks, you can use `/chunk default access <flags>`. If you want
to set how players can interact with a specific chunk, you can use
`/chunk default access here <flags>` to change access flags for the chunk 
you're currently standing in. If you want to control how a specific player can 
access a specific chunk, use `/chunk access <player name> <flags>` while 
standing in that chunk.

You can give a specific claimed chunk to another player by using 
`/chunk give <player name>` to transfer ownership of the chunk you're standing 
in.
