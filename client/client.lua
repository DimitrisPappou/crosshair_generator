-- Client
local toggler = true

--[[
SetResourceKvp("crosshair_settings", {
    alpha = 255,
    thickness = 1,
    size = 10,
    gap = 5,
    outline = 0,
    color = {50, 200, 50},
    dot = false
})
]]

-- Load the crosshair settings from the kvp
local settings = json.decode(GetResourceKvpString("crosshair_settings"))

CreateThread(function ()
    while not NetworkIsPlayerActive(PlayerId()) do
        Wait(0)
    end
    Wait(2000)

    -- If the kvp is empty, set the default settings
    if settings == nil then
        settings = {
            alpha = 255,
            thickness = 1,
            size = 10,
            gap = 5,
            outline = 0,
            color = {50, 200, 50},
            dot = false
        }

        -- Notify the user that he can change the crosshair settings by pressing M
        TriggerEvent('chat:addMessage', {
            color = {255, 0, 0},
            multiline = true,
            args = {"Crosshair", "You can change the crosshair settings by pressing M"}
        })
    end

    -- Send the settings to the NUI
    SendNUIMessage({
        type = "settings",
        settings = settings
    })
end)



-- Show to crosshair when the player is aiming or the menu is toggled
CreateThread(function ()
    while true do
        Wait(0)
        if toggler then
            if IsPlayerFreeAiming(PlayerId()) then
                ShowCrosshair()
            else
                HideCrosshair()
            end
        end
    end
end)

-- Use this if you want the user not to have the default GTA crosshair when aiming
CreateThread(function ()
    while true do
        Wait(0)
        HideHudComponentThisFrame(14)
    end
end)

-- Function that toggles the crosshair menu
ToggleCrosshairMenu = function()
    SetNuiFocus(toggler, toggler)
    SendNUIMessage({
        type = "toggle"
    })
    toggler = not toggler
end

-- Function that hides the crosshair
HideCrosshair = function()
    SendNUIMessage({
        type = "hide"
    })
end

-- Function that shows the crosshair
ShowCrosshair = function()
    SendNUIMessage({
        type = "show"
    })
end

-- NUI Callback to hide the crosshair
RegisterNUICallback('close', function(data, cb)
    ToggleCrosshairMenu()

    -- Save in kvp all crosshair settings
    SetResourceKvp("crosshair_settings", {
        alpha = data.alpha,
        thickness = data.thickness,
        size = data.size,
        gap = data.gap,
        outline = data.outline,
        color = data.color,
        dot = data.dot
    })
end)

-- Register the command to toggle the crosshair menu
RegisterCommand('+toggleCrosshairMenu', ToggleCrosshairMenu)

RegisterKeyMapping('+toggleCrosshairMenu', 'Toggle Crosshair Menu', 'keyboard', 'M') -- Change this to whatever you want: default keybind is "M"