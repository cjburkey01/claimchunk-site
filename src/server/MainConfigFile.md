# Main Config File

The standard 0.0.23 configuration file looks like this:

```yml
basic:
  # When set to true, permissions will be granted such that OPs are admins and
  # non-OPs have claimchunk.player
  disablePermissions: false
  # Whether to check for an update available in the GitHub releases. Set to
  # false to disable
  checkForUpdates: true

log:
  # When enabled, extra debug information is printed in the console and
  # labelled as DEBUG.
  debugSpam: false
  # When enabled, allow ClaimChunk to send information to bStats.org for
  # statistics collection. You aren't tracked, but you're free to disable this
  # if you please.
  anonymousMetrics: true

titles:
  # When enabled, ClaimChunk will send a majority of notifications to users via
  # the action bar or subtitle bar.
  useTitlesInsteadOfChat: true
  # Whether to send messages to the action bar instead of the subtitle bar.
  # Note: This may become per-player (and make this option obsolete) in the
  #       future.
  useActionBar: true
  # Number of ticks to fade in the title (20 ticks = 1 second)
  titleFadeInTime: 20
  # Number of ticks for title to stay on screen (20 ticks = 1 second)
  titleStayTime: 140
  # Number of ticks to fade out the title (20 ticks = 1 second)
  titleFadeOutTime: 20

colors:
  # Option for setting the info color of chat messages.
  # Note: This will be obsolete in the future with the message overhaul.
  infoColor: GOLD
    # Option for setting the error color of chat messages.
    # Note: This will be obsolete in the future with the message overhaul.
  errorColor: RED

chunks:
  # The default maximum number of chunks a player may claim for themselves.
  # When set to -1, players may claim as many chunks as would like.
  # This option is override by the rank permission maximums granted.
  maxChunksClaimed: 50
  # Whether to display particles when a player claims a chunk.
  # This may also become obsolete if players have more configuration options.
  particlesWhenClaiming: true
  # Whether to allow players who are not visible to the owning player to bypass
  # the `/chunk alert` settings players may have enabled.
  hideAlertsForVanishedPlayers: true
  # How long (in seconds) a player must be offline before their chunk is marked
  # as unclaimed again. If this is -1, chunks won't be unclaimed automatically.
  automaticUnclaimSeconds: -1
  # How frequently ClaimChunk should check for claimed chunks with players who
  # have been offline for the `automaticUnclaimSeconds` amount of time.
  unclaimCheckIntervalTicks: 1200
  # Whether to show when players enter/exit claimed or unclaimed chunks.
  displayNameOfOwner: true

  # TODO:
  defaultSendAlertsToOwner: true
  maxPerListPage: 5
  disabledWorlds: []
  nearChunkSearch: 5
  maxScanRange: 20

chunkOutline:
  name: 'SMOKE_LARGE'
  durationSeconds: 5
  spawnsPerSecond: 2
  particlesPerSpawn: 2
  heightRadius: 3

worldguard:
  allowClaimsInRegionsByDefault: true
  allowClaimingInNonGuardedWorlds: true
  allowAdminOverride: true

economy:
  useEconomy: true
  claimPrice: 100.0
  unclaimReward: 10.0
  firstFreeChunks: 0

data:
  saveDataIntervalInMinutes: 10
  keepJsonBackups: true
  minBackupIntervalInMinutes: 120
  deleteOldBackupsAfterMinutes: 10080

database:
  useDatabase: false
  groupRequests: true
  convertOldData: true
  hostname: '127.0.0.1'
  port: 3306
  database: 'MyServer'
  username: 'root'
  password: 'root'
  printDebug: false
  useSsl: false
  allowPublicKeyRetrieval: false

floodclaim:
  enabled: true
  maximumIterations: 6
  maximumArea: 41
```
