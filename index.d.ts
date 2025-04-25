import {
    Message,
    TextBasedChannel,
    MessagePayload,
    MessageCreateOptions,
} from 'discord.js'


type DiscordMessageBase = {
    id: string
    content: string
    channelId: string
    guildId?: string
    editedTimestamp?: string | null
}

type DiscordBasicMessageData = DiscordMessageBase & {
    author: {
        id: string
        username: string
        discriminator: string
        avatar?: string | null
    },
    timestamp: string

}



type GenericLogEditCallback = (data: any) => void

type PlayerChatCallback = (data: PlayerChatCallbackParams) => void
type TellrawCallback = (data: MessageBase) => void
type DeathCallback = (data: MessageBase) => void
type JoinCallback = (data: PlayerBase) => void
type LeaveCallback = (data: LeaveCallbackParams) => void
type KicksCallback = (data: KicksCallbackParams) => void

type DiscordMessageCallback = (message: DiscordBasicMessageData) => void

interface LogCategory<T extends (...args: any) => void = GenericLogEditCallback> {
    edit(cb: T): void
}

interface MessageBase {
    message: string
}

interface PlayerBase {
    username: string
    xuid: string
    pfpLink: string
    device: string
}

interface PlayerChatCallbackParams extends PlayerBase, MessageBase { }

interface LeaveCallbackParams extends PlayerBase {
    timePlayed: string
}

interface KicksCallbackParams extends PlayerBase {
    reason: string
    extraReason: {
        reasonType: string
        reason: string
    } | null
}

interface Logs {
    playerChat: LogCategory<PlayerChatCallback>
    tellraw: LogCategory<TellrawCallback>
    deaths: LogCategory<DeathCallback>
    joins: LogCategory<JoinCallback>
    leaves: LogCategory<LeaveCallback>
    kicks: LogCategory<KicksCallback>
}


/**
 * 
 * @param cb The function to be executed when a message is recieved
*/
declare function onMessage(cb: DiscordMessageCallback): void

/**
 * Sends a message to a specified channel
 * 
 * @param message The message to send to the channel. Can be a string, MessagePayload, or MessageCreateOptions
 * @param channel The channel where the message will be sent
*/
declare function sendMessage(
    message: string | MessagePayload | MessageCreateOptions,
    channel: TextBasedChannel
): Promise<DiscordMessageBase>

declare const logs: Logs
/**
 * The channel id where the join command was executed in
*/
declare const channelId: string
/**
 * The id of the discord server that this bot is linked to
*/
declare const guildId: string

/**
 * A class to build and manage Discord embeds
 */
export declare class EmbedBuilder {
    /**
     * Sets the title of the embed
     * @param title The title of the embed
     */
    setTitle(title: string): this;

    /**
     * Sets the description of the embed
     * @param description The description of the embed
     */
    setDescription(description: string): this;

    /**
     * Sets the color of the embed
     * @param color The color of the embed in hexadecimal or integer format
     */
    setColor(color: string | number): this;

    /**
     * Adds a field to the embed
     * @param name The name of the field
     * @param value The value of the field
     * @param inline Whether the field should be displayed inline
     */
    addField(name: string, value: string, inline?: boolean): this;

    /**
     * Sets the footer of the embed
     * @param text The footer text
     * @param iconURL The URL of the footer icon
     */
    setFooter(text: string, iconURL?: string): this;

    /**
     * Sets the timestamp of the embed
     * @param timestamp The timestamp to set, defaults to the current time
     */
    setTimestamp(timestamp?: Date): this;

    /**
     * Sets the URL of the embed
     * @param url The URL to set
     */
    setURL(url: string): this;

    /**
     * Sets the author of the embed
     * @param name The name of the author
     * @param iconURL The URL of the author's icon
     * @param url The URL of the author
     */
    setAuthor(name: string, iconURL?: string, url?: string): this;

    /**
     * Sets the thumbnail of the embed
     * @param url The URL of the thumbnail image
     */
    setThumbnail(url: string): this;

    /**
     * Sets the image of the embed
     * @param url The URL of the image
     */
    setImage(url: string): this;

    /**
     * Converts the embed to a JSON object
     */
    toJSON(): object;
}