const ByteArray = imports.byteArray;
const Desklet = imports.ui.desklet;
const GLib = imports.gi.GLib;
const Mainloop = imports.mainloop;
const St = imports.gi.St;

class LocalIpDesklet extends Desklet.Desklet {
    constructor(metadata, desklet_id) {
        super(metadata, desklet_id);

        this._label = new St.Label({
            text: "Lokal IP-adresse\nFinder adresse...",
            style: "font-size: 16px; color: white; padding: 12px; " +
                "background-color: rgba(0, 0, 0, 0.65); border-radius: 8px;"
        });
        this._label.style_class = "local-ip-desklet-label";
        this.setContent(this._label);
        this.setHeader(_("Lokal IP-adresse"));
        this._refreshTimeout = 0;
    }

    on_desklet_added_to_desktop() {
        this._updateAddress();
        this._refreshTimeout = Mainloop.timeout_add_seconds(10, () => {
            this._updateAddress();
            return true;
        });
    }

    on_desklet_removed() {
        if (this._refreshTimeout !== 0) {
            Mainloop.source_remove(this._refreshTimeout);
            this._refreshTimeout = 0;
        }
    }

    _updateAddress() {
        const [success, stdout, stderr, status] = GLib.spawn_command_line_sync(
            "ip -4 -o addr show scope global"
        );

        if (!success || status !== 0) {
            global.logError("Local IP desklet: could not read IPv4 addresses: " +
                ByteArray.toString(stderr));
            this._label.set_text("Lokal IP-adresse\nKunne ikke læse adressen");
            return;
        }

        const output = ByteArray.toString(stdout);
        const match = output.match(/\binet\s+(\d{1,3}(?:\.\d{1,3}){3})\//);
        this._label.set_text(match
            ? "Lokal IP-adresse\n" + match[1]
            : "Lokal IP-adresse\nIngen forbindelse");
    }
}

function main(metadata, desklet_id) {
    return new LocalIpDesklet(metadata, desklet_id);
}
