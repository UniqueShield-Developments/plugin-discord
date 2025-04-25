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
export function onMessage(cb: DiscordMessageCallback): void

/**
 * Sends a message to a specified channel
 * 
 * @param message The message to send to the channel. Can be a string, MessagePayload, or MessageCreateOptions
 * @param channel The channel where the message will be sent
*/
export function sendMessage(
    message: string | MessagePayload | MessageCreateOptions,
    channel: TextBasedChannel
): Promise<DiscordMessageBase>

export const logs: Logs
/**
 * The channel id where the join command was executed in
*/
export const channelId: string
/**
 * The id of the discord server that this bot is linked to
*/
export const guildId: string

export { EmbedBuilder } from "discord.js"
