# show_local_ip_on_desktop

En Cinnamon-desklet til Linux Mint, som viser den lokale IPv4-adresse
direkte på skrivebordet.

## Funktioner

- Opdaterer adressen hvert 10. sekund.
- Viser hvid tekst på en halvgennemsigtig, mørk baggrund.
- Viser "Ingen forbindelse", hvis ingen lokal IPv4-adresse findes.
- Viser en fejlbesked og logger fejlen i Cinnamon, hvis kommandoen fejler.

Widgetten bruger `ip -4 -o addr show scope global` og viser den første
IPv4-adresse i resultatet. Ved flere netværkskort, VPN eller virtuelle
netværk vises derfor kun én adresse, som ikke nødvendigvis er adressen
på den primære internetforbindelse. Den viser ikke den offentlige
internet-IP eller IPv6-adresser.

## Krav

- Cinnamon-skrivebordsmiljøet, eksempelvis på Linux Mint Cinnamon.
- Kommandoen `ip` fra pakken `iproute2` (normalt allerede installeret).

## Installation

Klon repositoryet, og kopiér desklet-mappen:

```sh
git clone https://github.com/PCgoDK/show_local_ip_on_desktop.git
cd show_local_ip_on_desktop
mkdir -p ~/.local/share/cinnamon/desklets
cp -R local-ip@pcgo ~/.local/share/cinnamon/desklets/
```

Højreklik derefter på skrivebordet, vælg **Tilføj desklets**, find
**Lokal IP-adresse**, og tilføj den. Flyt den til den ønskede placering.
Hvis den ikke vises på listen, log ud og ind igen, og prøv på ny.

Ved opdatering af en allerede installeret udgave: fjern først widgetten
fra skrivebordet, kopiér filerne igen, og log ud og ind for at genindlæse
koden, før widgetten tilføjes igen.

## Filer

- [desklet.js](local-ip@pcgo/desklet.js): visning og opdatering af adressen.
- [metadata.json](local-ip@pcgo/metadata.json): navn, UUID og Cinnamon-metadata.

## Afinstallation

Fjern widgetten fra skrivebordet. Slet derefter kun den installerede
mappe `~/.local/share/cinnamon/desklets/local-ip@pcgo`, hvis filerne
også skal fjernes.