-- ============ contact_inquiries ============
ALTER TABLE public.contact_inquiries
  ADD CONSTRAINT chk_ci_name_len CHECK (char_length(name) BETWEEN 1 AND 100),
  ADD CONSTRAINT chk_ci_email_len CHECK (char_length(email) BETWEEN 3 AND 255),
  ADD CONSTRAINT chk_ci_phone_len CHECK (phone IS NULL OR char_length(phone) <= 20),
  ADD CONSTRAINT chk_ci_message_len CHECK (char_length(message) BETWEEN 10 AND 1000),
  ADD CONSTRAINT chk_ci_service_vals CHECK (
    service IS NULL OR service IN (
      'Tax Advisory','GST Compliance','Statutory Audit',
      'Corporate Advisory','Startup Consulting','Other'
    )
  );

DROP POLICY IF EXISTS "Anyone can submit inquiries" ON public.contact_inquiries;

CREATE POLICY "Public can submit inquiries"
  ON public.contact_inquiries
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(name) BETWEEN 1 AND 100
    AND char_length(email) BETWEEN 3 AND 255
    AND (phone IS NULL OR char_length(phone) <= 20)
    AND char_length(message) BETWEEN 10 AND 1000
  );

CREATE POLICY "Deny read to anon and authenticated"
  ON public.contact_inquiries
  FOR SELECT
  TO anon, authenticated
  USING (false);

CREATE POLICY "Deny update to anon and authenticated"
  ON public.contact_inquiries
  FOR UPDATE
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);

CREATE POLICY "Deny delete to anon and authenticated"
  ON public.contact_inquiries
  FOR DELETE
  TO anon, authenticated
  USING (false);

-- ============ consultation_bookings ============
ALTER TABLE public.consultation_bookings
  ADD CONSTRAINT chk_cb_name_len CHECK (char_length(name) BETWEEN 1 AND 100),
  ADD CONSTRAINT chk_cb_email_len CHECK (char_length(email) BETWEEN 3 AND 255),
  ADD CONSTRAINT chk_cb_phone_len CHECK (char_length(phone) BETWEEN 7 AND 20),
  ADD CONSTRAINT chk_cb_notes_len CHECK (notes IS NULL OR char_length(notes) <= 1000),
  ADD CONSTRAINT chk_cb_time_vals CHECK (
    preferred_time IN (
      '10:00 AM','11:00 AM','12:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM'
    )
  ),
  ADD CONSTRAINT chk_cb_service_vals CHECK (
    service_type IS NULL OR service_type IN (
      'Tax Advisory','GST Compliance','Statutory Audit',
      'Corporate Advisory','Startup Consulting','Other'
    )
  );

DROP POLICY IF EXISTS "Anyone can book consultations" ON public.consultation_bookings;

CREATE POLICY "Public can book consultations"
  ON public.consultation_bookings
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(name) BETWEEN 1 AND 100
    AND char_length(email) BETWEEN 3 AND 255
    AND char_length(phone) BETWEEN 7 AND 20
    AND (notes IS NULL OR char_length(notes) <= 1000)
  );

CREATE POLICY "Deny read to anon and authenticated"
  ON public.consultation_bookings
  FOR SELECT
  TO anon, authenticated
  USING (false);

CREATE POLICY "Deny update to anon and authenticated"
  ON public.consultation_bookings
  FOR UPDATE
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);

CREATE POLICY "Deny delete to anon and authenticated"
  ON public.consultation_bookings
  FOR DELETE
  TO anon, authenticated
  USING (false);