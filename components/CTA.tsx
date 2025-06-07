/**
 * CTA (Call to Action) Component
 * Promotional section encouraging users to create a new learning companion
 * Displays descriptive text, illustration, and action button
 */

import Image from "next/image"
import Link from "next/link"

/**
 * CTA component that promotes companion creation
 * @returns A promotional section with text, image, and action button
 */
const CTA = () => {
  return (
    <section className="cta-section">
      {/* Promotional badge */}
      <div className="cta-badge">
        Start learning your way.
      </div>
      {/* Main heading */}
      <h2 className="text-3xl font-bold">
        Build and Personalize Learning Companion
      </h2>
      {/* Descriptive text */}
      <p>
        Pick a name, subject, voice, & personality - and start learning through voice conversations that feel natural and fun.
      </p>
      {/* Promotional illustration */}
      <Image
        src="/images/cta.svg"
        alt="cta"
        width={362}
        height={232}
      />
      {/* Action button with icon */}
      <button className="btn-primary">
        <Image
          src="/icons/plus.svg"
          alt="plus"
          width={12}
          height={12}
        />
        <Link href="/companions/new">
          <p>Build a New Companion</p>
        </Link>
      </button>
    </section>
  )
}

export default CTA