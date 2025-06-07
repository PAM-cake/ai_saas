/**
 * Companion Component
 * Interactive learning session component with voice chat functionality
 * Handles real-time communication, speech visualization, and session management
 */

"use client"

import { cn, configureAssistant, getSubjectColor } from '@/lib/utils'
import { vapi } from '@/lib/vapi.sdk'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import Lottie, { LottieRefCurrentProps } from 'lottie-react'
import soundwaves from '@/constants/soundwaves.json'
import { addToSessionHistory } from '@/lib/actions/companion.actions'

/**
 * Interface for saved chat messages
 */
interface SavedMessages {
    role: string;
    content: string;
}

/**
 * Enum for call status states
 */
enum CallStatus {
    INACTIVE = "INACTIVE",
    CONNECTING = "CONNECTING",
    ACTIVE = "ACTIVE",
    FINISHED = "FINISHED"
}

/**
 * Companion Component for interactive learning sessions
 * @param props - Component props including companion and user details
 * @returns An interactive learning session interface
 */
const CompanionComponent = ({ companionId, subject, topic, name, userName, userImage, style, voice }: CompanionComponentProps) => {
    // State management for call status and UI
    const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE)
    const [isSpeaking, setIsSpeaking] = useState(false)
    const [isMuted, setIsMuted] = useState(false)
    const [messages, setMessages] = useState<SavedMessages[]>([])
    const lottieRef = useRef<LottieRefCurrentProps>(null)

    /**
     * Effect to control sound wave animation based on speaking state
     */
    useEffect(() => {
        if (lottieRef) {
            if (isSpeaking) lottieRef.current?.play()
            else lottieRef.current?.stop()
        }
    }, [isSpeaking])

    /**
     * Effect to set up event listeners for voice API
     * Handles call events, messages, and speech states
     */
    useEffect(() => {
        const onCallStart = () => setCallStatus(CallStatus.ACTIVE)
        const onCallEnd = () => {
            setCallStatus(CallStatus.FINISHED)
            addToSessionHistory(companionId)
        }

        const onMessage = (message: Message) => {
            if (message.type === 'transcript' && message.transcriptType === 'final') {
                const newMessage = { role: message.role, content: message.transcript }
                setMessages((prev) => [newMessage, ...prev])
            }
        }

        const onSpeechStart = () => setIsSpeaking(true)
        const onSpeechEnd = () => setIsSpeaking(false)
        const onError = (error: Error) => console.log('Error', error)

        // Set up event listeners
        vapi.on('call-start', onCallStart)
        vapi.on('call-end', onCallEnd)
        vapi.on('message', onMessage)
        vapi.on('error', onError)
        vapi.on('speech-start', onSpeechStart)
        vapi.on('speech-end', onSpeechEnd)

        // Clean up event listeners
        return () => {
            vapi.off('call-start', onCallStart)
            vapi.off('call-end', onCallEnd)
            vapi.off('message', onMessage)
            vapi.off('error', onError)
            vapi.off('speech-start', onSpeechStart)
            vapi.off('speech-end', onSpeechEnd)
        }
    }, [])

    /**
     * Toggles microphone mute state
     */
    const toggleMicrophone = () => {
        const isMuted = vapi.isMuted()
        vapi.setMuted(!isMuted)
        setIsMuted(!isMuted)
    }

    /**
     * Initiates a learning session call
     */
    const handleCall = async () => {
        setCallStatus(CallStatus.CONNECTING)

        const assistantOverrides = {
            variableValues: { subject, topic, style },
            clientMessages: ["transcript"],
            serverMessages: [],
        }

        // @ts-expect-error
        vapi.start(configureAssistant(voice, style), assistantOverrides)
    }

    /**
     * Ends the current learning session
     */
    const handleDisconnect = () => {
        setCallStatus(CallStatus.FINISHED)
        vapi.stop()
    }

    return (
        <section className='flex flex-col h-[90vh] max-h-[90vh]'>
            {/* Main session interface */}
            <section className='flex gap-8 max-sm:flex-col'>
                {/* Companion section with avatar and animation */}
                <div className='companion-section'>
                    <div className='companion-avatar' style={{ backgroundColor: getSubjectColor(subject) }}>
                        {/* Static companion icon */}
                        <div className={cn("absolute transition-opacity duration-1000", callStatus === CallStatus.FINISHED || callStatus === CallStatus.INACTIVE ? 'opacity-100' : 'opacity-0', callStatus === CallStatus.CONNECTING && 'opacity-100 animate-pulse')}>
                            <Image
                                src={`/icons/${subject}.svg`}
                                alt={subject}
                                width={150}
                                height={150}
                                className='max-sm:w-fit'
                            />
                        </div>
                        {/* Sound wave animation */}
                        <div className={cn('absolute transition-opacity duration-1000', callStatus === CallStatus.ACTIVE ? 'opacity-100' : 'opacity-0')}>
                            <Lottie
                                lottieRef={lottieRef}
                                animationData={soundwaves}
                                autoplay={false}
                                className='companion-lottie'
                            />
                        </div>
                    </div>
                    <p className='font-bold text-2xl'>{name}</p>
                </div>

                {/* User section with controls */}
                <div className='user-section'>
                    {/* User avatar and name */}
                    <div className='user-avatar'>
                        <Image src={userImage} alt={userName} width={130} height={130} />
                        <p className='font-bold text-2xl'>{userName}</p>
                    </div>
                    {/* Microphone toggle button */}
                    <button className='btn-mic' onClick={toggleMicrophone} disabled={callStatus !== CallStatus.ACTIVE}>
                        <Image
                            src={isMuted ? '/icons/mic-off.svg' : '/icons/mic-on.svg'}
                            alt='mic'
                            width={36}
                            height={36}
                        />
                        <p className='max-sm:hidden'>
                            {isMuted ? 'Turn on the mic' : 'Turn off the mic'}</p>
                    </button>
                    {/* Session control button */}
                    <button
                        className={cn("rounded-lg py-2 transition-colors w-full text-white", callStatus === CallStatus.ACTIVE ? 'bg-red-700' : "bg-primary", callStatus === CallStatus.CONNECTING && 'animate-pulse')}
                        onClick={callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall}
                    >
                        {callStatus === CallStatus.ACTIVE
                            ? "End Session"
                            : callStatus === CallStatus.CONNECTING
                                ? "Connecting"
                                : "Start The Session"
                        }
                    </button>
                </div>
            </section>

            {/* Chat transcript section */}
            <section className='flex-1 overflow-y-auto p-4'>
                <div className='space-y-2'>
                    {messages.map((message, index) => {
                        if (message.role === 'assistant') {
                            return (
                                <p key={index} className='max-sm:text-sm'>
                                    {name.split(' ')[0].replace(/[.,]/g, '')}: {message.content}
                                </p>
                            )
                        } else {
                            return (
                                <p key={index} className='text-primary max-sm:text-sm'>
                                    {userName}: {message.content}
                                </p>
                            )
                        }
                    })}
                </div>
            </section>
        </section>
    )
}

export default CompanionComponent
