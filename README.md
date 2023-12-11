# DimitrisPappou Crosshair Generator Script

This script allows players to customize and toggle a crosshair in FiveM, enhancing their aiming experience. Below is a comprehensive guide on how to use and configure the crosshair generator.

## Usage

### Opening and Closing the Crosshair Menu

- **Keybind**: Press 'M' to open/close the crosshair menu. This can be changed.

### Customizing the Crosshair

1. **Alpha**: Adjust the transparency of the crosshair.
   
2. **Thickness**: Set the thickness of the crosshair lines.

3. **Size**: Determine the length of the crosshair lines.

4. **Gap**: Control the gap between the crosshair lines.

5. **Outline**: Add an outline around the crosshair for better visibility.

6. **Color**: Choose a predefined color or customize the RGB values.

7. **Dot**: Toggle a central dot in the crosshair.

8. **Done**: Click the "Done" button to save your changes.

### Notes

- The crosshair is displayed when aiming or when the menu is toggled.
  
- To prevent the default GTA crosshair from showing while aiming, the script hides it.

- Crosshair settings are saved using key-value pairs (kvp) to persist across sessions.

## Default Settings

If no settings are found in the kvp, the script will use the following default settings:

```lua
alpha = 255,
thickness = 1,
size = 10,
gap = 5,
outline = 0,
color = {50, 200, 50},
dot = false
```

## Customizing Color

- Predefined colors include green, yellow, blue, and cyan. Choose "Custom" to use RGB sliders.

## Troubleshooting

If you encounter issues or have questions, please refer to the <a href="https://forum.cfx.re/">FiveM forums</a>, or contact me on discord: dimitris.pappou.

## Credits

This script was created by DimitrisPappou. Feel free to reach out for support or suggestions.

## License

This script is provided under the Apache License 2.0. Feel free to modify and distribute it as needed.