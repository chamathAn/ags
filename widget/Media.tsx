import { bind } from "astal";
import { App, Astal, Gdk, Gtk } from "astal/gtk3";
import Mpris from "gi://AstalMpris";

const WINDOW_NAME = "media";

export default function Media() {
  const SpotifyInfo = () => {
    const spotify = Mpris.Player.new("spotify");

    return (
      <>
        {bind(spotify, "available").as((available) =>
          available ? (
            <box>
              <box
                className="Cover"
                css={bind(spotify, "coverArt").as(
                  (cover) => `background-image: url('${cover}');`,
                )}
              />
              <box vertical className="Player" valign={Gtk.Align.CENTER}>
                <label
                  label={bind(spotify, "title")}
                  className="Title"
                  xalign={0} // Align label left
                  wrap
                />
                <label
                  label={bind(spotify, "artist")}
                  className="Artist"
                  xalign={0}
                  truncate
                />
                <label
                  label={bind(spotify, "album")}
                  className="Album"
                  xalign={0}
                  truncate
                />
              </box>
            </box>
          ) : (
            "No media playing"
          ),
        )}
      </>
    );
  };

  return (
    <window
      name={WINDOW_NAME}
      application={App}
      visible={false}
      keymode={Astal.Keymode.EXCLUSIVE}
      layer={Astal.Layer.OVERLAY}
      vexpand={true}
      anchor={Astal.WindowAnchor.BOTTOM}
      onKeyPressEvent={(self, event) => {
        if (event.get_keyval()[1] === Gdk.KEY_Escape) {
          if (self.visible) {
            self.visible = false;
          }
        }
      }}
    >
      <box className="Media base">
        <SpotifyInfo />
      </box>
    </window>
  );
}
