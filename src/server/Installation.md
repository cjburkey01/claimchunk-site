# Installation Guide

ClaimChunk is compatible with most Spigot/Bukkit API server installations, including [Paper](https://papermc.io/).

Installing ClaimChunk is easy! First, obtain your desired version from the [Downloads page](./Downloads.md) (if you use a snapshot version, you will have to extract the zip file to get the plugin jar).

Then, **make sure to stop your server**! Many server owners use the `/reload` Bukkit command which *does not work* for *most* plugins. It may suffice to test, but please, *please* always make sure to fully reboot your server when dealing with any plugins at all. Keeping state is difficult and plugins (ClaimChunk included) can fail for seemingly random reasons (I don't even know why, it's just bad).

> *Servers with no plugins may find using* `/reload` *convenient, and generally it's safe on effectively vanilla Spigot/Bukkit servers. Using* `/reload` *after plugins have been enabled may cause issues, though. Just be careful :)*

Next, drop your ClaimChunk jar into the `plugins` directory within your server folder.

Finally, start up your server to generate all of ClaimChunk's configuration files and to make sure you see output in the console (and no errors are present). You should see some output in your console like this:

```
[<TIME>] [Server thread/INFO]: [ClaimChunk] Enabling ClaimChunk <VERSION>
[<TIME>] [Server thread/INFO]: [ClaimChunk] Economy not enabled.
[<TIME>] [Server thread/INFO]: [ClaimChunk] PlaceholderAPI not found, not loading API.
[<TIME>] [Server thread/INFO]: [ClaimChunk] Initialization complete.
[<TIME>] [Server thread/INFO]: Server permissions file permissions.yml is empty, ignoring it
[<TIME>] [Server thread/INFO]: Done (<START TIME>)! For help, type "help"
```

If you see the `[ClaimChunk] Initialization complete.` message, ClaimChunk should be enabled and functioning. If you wish to use some of the other functionality, more plugins may be required. Please continue reading this page to see these requirements.

## Economy Setup

If you plan to use some economy plugin *along side [Vault](https://github.com/MilkBowl/Vault/)*&mdash;such as [Essentials](https://essentialsx.net/)&mdash;make sure to run your server at least once to ensure ClaimChunk enables and generates its config. Make sure you have Vault if you wish to use any economy! And you must also have an economy plugin to sit on top of Vault. Vault is an API acts as a sort of middleman between ClaimChunk and whatever your economy plugin is, so it is required for compatibility. Unfortunately, only Vault economies will work with ClaimChunk as these are the most widely accepted kind for the time being.

Next, open up the `config.yml` file inside the `plugins/ClaimChunk` directory and make sure the `useEconomy` option is set to `true` under the `economy` section, ensuring it looks like this:

```yml
# -- more config up here --

economy:
  useEconomy: true
  claimPrice: 100.0
  unclaimReward: 10.0
  firstFreeChunks: 0

# -- more config down here --
```

> This option may be enabled by default, but make sure to double check it, especially if you have installed your economy plugins but the economy feature still fails to work.

> *For those who are new to running servers, this config format (YAML) uses* `#` *to start a comment line, which is ignored entirely following the* `#` *until the next line.*

## PlaceholderAPI

ClaimChunk supports the usage of placeholders within its messages (which can be configured in the `messages.json` file in the `plugins/ClaimChunk` directory) as well as provides a [couple placeholders](./Placeholders.md) for your use.

Make sure to have [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) installed for your server and ClaimChunk will automatically hook itself in. Please see the [Placeholders](./Placeholders.md) page for more information on how to use them.
